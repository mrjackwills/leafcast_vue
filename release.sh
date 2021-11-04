#!/bin/bash

PACKAGE_NAME='mealpedant_backup_pi'
STAR_LINE='****************************************'

# $1 string - error message
error_close() {
	echo -e "\n${RED}ERROR: ${YELLOW}$1${RESET}\n";
	exit 1
}

# $1 string - question to ask
ask_yn () {
	printf  "%b%s? [y/N]:%b " "${GREEN}" "$1" "${RESET}"
}

# return user input
user_input() {
	read -r data
	echo "$data"
}

#$1 semver MAJOR
#$2 semver MINOR
#$3 semver PATCH
update_major () {
	RESULT="$(($1 + 1)).0.0"
	echo "$RESULT"
}

#$1 semver MAJOR
#$2 semver MINOR
#$3 semver PATCH
update_minor () {
	RESULT="$1.$(($2 + 1)).0"
	echo "$RESULT"
}

#$1 semver MAJOR
#$2 semver MINOR
#$3 semver PATCH
update_patch () {
	RESULT="$1.$2.$(($3 + 1))"
	echo "$RESULT"
}

# $1 new_version
update_api_version_ts () {
	NODE_FILE=./src/config/api_version.ts
	if [[ -f "$NODE_FILE" ]]
	then
		echo "export const api_version = '${2:1}';" > $NODE_FILE
	fi
}

# $1 package_name
# $2 new_version
update_yaml () {
	DOCKER_COMPOSE=./src/config/api_version.ts
	if [[ -f "$DOCKER_COMPOSE" ]]
	then
		yq e -i ".services.$1.image = \"$1:${2:1}\"" docker-compose.yml
	fi
}

# $1 new_version
# $2 package_json_location
# $3 package_name
update_json () {
	NEW_JSON=$(jq ".version = \"${1:1}\"" "$2")
	echo "$NEW_JSON" > "$2"
	update_api_version_ts "$3" "$1"
	update_yaml "$3" "$1"
}

# $1 new_version
# $2 package_json_location
# $3 package_name
update_package_files () {
	update_json "$1" "$2" "$3"
}


get_git_remote_url() {
	REMOTE_ORIGIN=$(git config --get remote.origin.url)
	TO_REMOVE=".git"
	printf '%s\n' "${REMOTE_ORIGIN//$TO_REMOVE}"
}

check_git() {
	CURRENT_GIT_BRANCH=$(git branch --show-current)
	GIT_CLEAN=$(git status --porcelain)
	if [[ -n $GIT_CLEAN ]]
	then
		printf "\ngit dirty\n\n"
		exit
	fi
	if [[ ! "$CURRENT_GIT_BRANCH" =~ ^dev$ ]]
	then
		printf "\nnot on dev branch\n\n"
		exit
	fi
}

ask_changelog_update() {
	echo "${STAR_LINE}"
	RELEASE_BODY_TEXT=$(sed '/# <a href=/Q' CHANGELOG.md)
	printf "%s" "$RELEASE_BODY_TEXT\n"
	printf "\n%s\n" "${STAR_LINE}"
	ask_yn "accept release body"
	if [[ "$(user_input)" =~ ^y$ ]] 
	then
		update_release_body_and_changelog "$RELEASE_BODY_TEXT"
	else
		exit
	fi
}

# $1 RELEASE_BODY
# $2 NEW_TAG_VERSION
update_release_body_and_changelog () {
	GIT_REPO_URL=$(get_git_remote_url)
	CHANGELOG_ADDITION="# <a href='${GIT_REPO_URL}/releases/tag/${NEW_TAG_VERSION}'>${NEW_TAG_VERSION}</a>\n#### $(date +'%Y-%m-%d')\n\n"
	RELEASE_BODY_ADDITION="$CHANGELOG_ADDITION$1"
	echo -e "${RELEASE_BODY_ADDITION}\n\nsee <a href='${GIT_REPO_URL}/blob/main/CHANGELOG.md'> CHANGELOG.md</a> for more details" > .github/release-body.md
	echo -e "${CHANGELOG_ADDITION}$(cat CHANGELOG.md)" > CHANGELOG.md
}

# $1 new_version
update () {
	PACKAGE_JSON=package.json
	update_package_files "$1" "$PACKAGE_JSON" "$PACKAGE_NAME"
}

check_tag () {
	LATEST_TAG=$(git describe --tags --abbrev=0 --always)
	if [[ $LATEST_TAG =~ ^v(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(-((0|[1-9][0-9]*|[0-9]*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9][0-9]*|[0-9]*[a-zA-Z-][0-9a-zA-Z-]*))*))?(\+([0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*))?$ ]]
	then
		IFS="." read -r MAJOR MINOR PATCH <<< "${LATEST_TAG:1}"
	else
		MAJOR="0"
		MINOR="0"
		PATCH="0"
	fi
	MAJOR_TAG=v$(update_major "$MAJOR" "$MINOR" "$PATCH")
	MINOR_TAG=v$(update_minor "$MAJOR" "$MINOR" "$PATCH")
	PATCH_TAG=v$(update_patch "$MAJOR" "$MINOR" "$PATCH")
	OP_MAJOR="major___$MAJOR_TAG"
	OP_MINOR="minor___$MINOR_TAG"
	OP_PATCH="patch___$PATCH_TAG"
	OPTIONS=("$OP_MAJOR" "$OP_MINOR" "$OP_PATCH")
	select choice in "${OPTIONS[@]}"
	do
		case $choice in
			"$OP_MAJOR" )
				echo "$MAJOR_TAG"
				break;;
			"$OP_MINOR")
				echo "$MINOR_TAG"
				break;;
			"$OP_PATCH")
				echo "$PATCH_TAG"
				break;;
			*)
				echo "invalid option $REPLY"
				break;;
		esac
	done
}

vue_build () {
	VUE_CONFIG="./vue.config.js"
	if [[ -f "$VUE_CONFIG" ]]
	then
		npm run build
	fi
}

release_flow() {
	check_git
	printf "Choose new tag version:\n\n"
	NEW_TAG_VERSION=$(check_tag)
	printf "\nnew tag chosen: %s\n\n" "${NEW_TAG_VERSION}"
	RELEASE_BRANCH=release-$NEW_TAG_VERSION
	echo -e
	ask_changelog_update
	git checkout -b "$RELEASE_BRANCH"
	update "$NEW_TAG_VERSION"
	git add .
	git commit -m "chore: release $NEW_TAG_VERSION"
	git checkout main
	git merge --no-ff "$RELEASE_BRANCH" -m "chore: merge ${RELEASE_BRANCH} into main"
	git tag -a -m "${RELEASE_BRANCH}" "$NEW_TAG_VERSION"
	git push --atomic origin main "$NEW_TAG_VERSION"
	git checkout dev
	git merge --no-ff main -m 'chore: merge main into dev'
	git branch -d "$RELEASE_BRANCH"
	vue_build
}

release_flow