#!/bin/bash

# v0.0.11

PACKAGE_NAME='leafcast_vue_site'

# Colours for echo
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
PURPLE='\033[0;35m'
RESET='\033[0m'


STAR_LINE='****************************************'
CWD=$(pwd)
BUILD_DATE=$(date "+%a %d %Y %B %T %Z")


# $1 string - error message
error_close() {
	echo -e "\n${RED}ERROR - EXITED: ${YELLOW}$1${RESET}\n";
	exit 1
}

if [ -z "$PACKAGE_NAME" ]
then
	error_close "No package name"
fi

# $1 string - question to ask
ask_yn () {
	printf "%b%s? [y/N]:%b " "${GREEN}" "$1" "${RESET}"
}

# return user input
user_input() {
	read -r data
	echo "$data"
}

ask_continue () {
	ask_yn "continue"
	if [[ ! "$(user_input)" =~ ^y$ ]] 
	then 
		exit
	fi
}


update_major () {
	local bumped_major
	bumped_major=$((MAJOR + 1))
	echo "${bumped_major}.0.0"
}

update_minor () {
	local bumped_minor
	bumped_minor=$((MINOR + 1))
	echo "${MAJOR}.${bumped_minor}.0"
}

update_patch () {
	local bumped_patch
	bumped_patch=$((PATCH + 1))
	echo "${MAJOR}.${MINOR}.${bumped_patch}"
}

# Get the url of the github repo, strip .git from the end of it
get_git_remote_url() {
	REMOTE_ORIGIN=$(git config --get remote.origin.url)
	TO_REMOVE=".git"
	GIT_REPO_URL="${REMOTE_ORIGIN//$TO_REMOVE}"
}

# Check that git status is clean
check_git_clean() {
	GIT_CLEAN=$(git status --porcelain)
	if [[ -n $GIT_CLEAN ]]
	then
		error_close "git dirty"
	fi
}

# Check currently on dev branch
check_git() {
	CURRENT_GIT_BRANCH=$(git branch --show-current)
	check_git_clean
	if [[ ! "$CURRENT_GIT_BRANCH" =~ ^dev$ ]]
	then
		error_close "not on dev branch"
	fi
}

check_git_update() {
	CURRENT_GIT_BRANCH=$(git branch --show-current)
	check_git_clean
	if [[ ! "$CURRENT_GIT_BRANCH" =~ ^chore/npm_update$ ]]
	then
		error_close "not on chore/npm_update branch"
	fi
}


ask_changelog_update() {
	echo "${STAR_LINE}"
	RELEASE_BODY_TEXT=$(sed '/# <a href=/Q' CHANGELOG.md)
	printf "%s" "$RELEASE_BODY_TEXT"
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
update_release_body_and_changelog () {
	echo -e
	DATE_SUBHEADING="### $(date +'%Y-%m-%d')\n\n"
	RELEASE_BODY_ADDITION="${DATE_SUBHEADING}$1"
	echo -e "${RELEASE_BODY_ADDITION}\n\nsee <a href='${GIT_REPO_URL}/blob/main/CHANGELOG.md'> CHANGELOG.md</a> for more details" > .github/release-body.md
	echo -e "# <a href='${GIT_REPO_URL}/releases/tag/${NEW_TAG_WITH_V}'>${NEW_TAG_WITH_V}</a>\n${DATE_SUBHEADING}${CHANGELOG_ADDITION}$(cat CHANGELOG.md)" > CHANGELOG.md
	sed -i -E "s|(\s)([0-9a-f]{40})| [\2](${GIT_REPO_URL}/commit/\2)|g" ./CHANGELOG.md
}

update_json () {
	local json_file="./package.json"
	local json_version_update
	local json_build_update
	json_version_update=$(jq ".version = \"${NEW_TAG_WITH_V:1}\"" "${json_file}")
	json_build_update=$(jq ".buildDate =\"${BUILD_DATE}\"" <<< "${json_version_update}")
	echo "$json_build_update" > "$json_file"
}


# $1 pacakge_name
update_api_version_ts () {
	NODE_FILE="./src/config/api_version.ts"
	if [[ -f "$NODE_FILE" ]]; then
		echo "export const api_version = '${NEW_TAG_WITH_V:1}';" > "$NODE_FILE"
	fi
}

update_yaml () {
	DOCKER_COMPOSE="./docker-compose.yml"
	if [[ -f "$DOCKER_COMPOSE" ]]
	then
	yq e -i ".services.$PACKAGE_NAME.image = \"$PACKAGE_NAME:${NEW_TAG_WITH_V:1}\"" ${DOCKER_COMPOSE}
	fi
}

# $1 new_version
bump_version () {
	update_json
	update_api_version_ts
	update_yaml
}

# Work out the current version, based on git tags
# create new semver version based on user input
# Set MAJOR MINOR PATCH
check_tag () {
	LATEST_TAG=$(git describe --tags --abbrev=0 --always)
	echo -e "\nCurrent tag: ${PURPLE}${LATEST_TAG}${RESET}\n"
	echo -e "${YELLOW}Choose new tag version:${RESET}\n"
	if [[ $LATEST_TAG =~ ^v(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(-((0|[1-9][0-9]*|[0-9]*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9][0-9]*|[0-9]*[a-zA-Z-][0-9a-zA-Z-]*))*))?(\+([0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*))?$ ]]
	then
		IFS="." read -r MAJOR MINOR PATCH <<< "${LATEST_TAG:1}"
	else
		MAJOR="0"
		MINOR="0"
		PATCH="0"
	fi
	OP_MAJOR="major___v$(update_major)"
	OP_MINOR="minor___v$(update_minor)"
	OP_PATCH="patch___v$(update_patch)"
	OPTIONS=("$OP_MAJOR" "$OP_MINOR" "$OP_PATCH")
	select choice in "${OPTIONS[@]}"
	do
		case $choice in
			"$OP_MAJOR" )
				MAJOR=$((MAJOR + 1))
				MINOR=0
				PATCH=0
				break;;
			"$OP_MINOR")
				MINOR=$((MINOR + 1))
				PATCH=0
				break;;
			"$OP_PATCH")
				PATCH=$((PATCH + 1))
				break;;
			*)
				error_close "invalid option $REPLY"
				break;;
		esac
	done
}

linter () {
	npm run lint
	ask_continue
}

npm_build () {
	npm run build
	ask_continue
}

npm_test () {
	start_time=$(date +%s)
	npm run test:run
	end_time=$(date +%s)
	elapsed=$(( end_time - start_time ))
	echo "test tooks ${elapsed}s"
	ask_continue
}

single_package_test() {
	ask_yn "run tests?"
		if [[ "$(user_input)" =~ ^y$ ]]
		then
			npm run lint
			npm run test
		fi
}

# $1 all_ncu
update_git_package() {
	to_add=()
	git_message="chore: npm update\n"
	while IFS= read -r line; do
		local trimmed_line
		trimmed_line="$(echo -e "${line}" | sed -e 's/^[[:space:]]*//')"
		to_add+=("$trimmed_line")
	done <<< "$1"
	for line in "${to_add[@]}"
	do
		echo -e ""
		echo "${line}"
		ask_yn "add line to git message"
		if [[ "$(user_input)" =~ ^y$ ]]
			then
			git_message="${git_message}\n${line}"
		fi
	done
	echo -e ""
	echo -e "${git_message}"
	ask_yn "accept message"
	if [[ "$(user_input)" =~ ^y$ ]]
	then
		git add package.json
		git add package-lock.json
		git commit -m "$(echo -e "${git_message}")"
	else
		exit
	fi
}

update() {
	check_git_update
	single_package_test "$DIRECTORY"
	all_ncu=$(ncu | tail -n +3 | head -n -2)
	echo "${all_ncu}"
	ncu -i
	ask_yn "npm install"
	if [[ "$(user_input)" =~ ^y$ ]]
	then
		npm install
		single_package_test
		update_git_package "${all_ncu}"
	fi
}

release_flow() {
	check_git
	get_git_remote_url
	linter
	npm_build
	cd "${CWD}" || error_close "Can't find ${CWD}"


	check_tag
	NEW_TAG_WITH_V="v${MAJOR}.${MINOR}.${PATCH}"
	printf "\nnew tag chosen: %s\n\n" "${NEW_TAG_WITH_V}"
	RELEASE_BRANCH=release-$NEW_TAG_WITH_V
	echo -e
	ask_changelog_update
	git checkout -b "$RELEASE_BRANCH"
	bump_version

	git add .
	git commit -m "chore: release $NEW_TAG_WITH_V"
	git checkout main
	git merge --no-ff "$RELEASE_BRANCH" -m "chore: merge ${RELEASE_BRANCH} into main"
	git tag -a -m "${RELEASE_BRANCH}" "$NEW_TAG_WITH_V"
	git push --atomic origin main "$NEW_TAG_WITH_V"
	git checkout dev
	git merge --no-ff main -m 'chore: merge main into dev'
	git branch -d "$RELEASE_BRANCH"
	git push origin dev
	npm run build
}

main() {
	cmd=(dialog --backtitle "Choose build option" --radiolist "choose" 14 80 16)
	options=(
		1 "update" update
		2 "lint" off
		3 "build" off
		4 "test" off
		5 "release" off
	)
	choices=$("${cmd[@]}" "${options[@]}" 2>&1 >/dev/tty)
	exitStatus=$?
	clear
	if [ $exitStatus -ne 0 ]; then
		exit
	fi
	for choice in $choices
	do
		case $choice in
			0)
				exit
				break;;
			1)
				update
				main
				break;;
			2)
				linter
				main
				break;;
			3)
				npm_build
				main
				break;;
			4)
				npm_test
				main
				break;;
			5)
				release_flow
				break;;
		esac
	done
}

main