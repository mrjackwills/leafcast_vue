# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.7.5'>v0.7.5</a>
### 2022-05-30

### Chores
+ npm update, [c9e67167697c764460fcbc9ac638adde7dc4b679], [e0e53daeb364be09337c265594704b0cb0911b40]

### Fixes
+ axios 429 response error type work-around, [4d417246180c99f9fe25c6f829c83ff9c1076c81]
+ security.txt updated, [98b868ed343141e9d6b7a9828ac937c137180bd0]
+ main.yml workflow updated, [2ca1098f3bc1b460e980cd3702ddc6dc26301e35]

### Featues
+ screen shot added to readme.md, [5797fc7646f248b99d2ded8c885f118853318bde]
+ updated to use rust powered backend, [1e5aedd2a82566f4a78c01cddd380814a1fa8260]

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.7.4'>v0.7.4</a>
### 2022-01-29

### Chores
+ npm update, [3d0db021d5c243710ffdc2aa3fd2f4037e339b01](https://github.com/mrjackwills/leafcast_vue/commit/3d0db021d5c243710ffdc2aa3fd2f4037e339b01)

### Features
+ routes put into enum, [67512fe78d159e3b2a510e30c311cf8f8c07286f](https://github.com/mrjackwills/leafcast_vue/commit/67512fe78d159e3b2a510e30c311cf8f8c07286f)
+ production mode put into env class, [32f9724d313a4cf91e37cec84938fa24206403dc](https://github.com/mrjackwills/leafcast_vue/commit/32f9724d313a4cf91e37cec84938fa24206403dc)

### Refactors
+ dead code removed, [5f4b2e0b8e896100d8ff5db8b1ce97e3c2004966](https://github.com/mrjackwills/leafcast_vue/commit/5f4b2e0b8e896100d8ff5db8b1ce97e3c2004966)

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.7.3'>v0.7.3</a>
### 2022-01-17

### Fixes
+ remove clientside pinger, [8ed59691a840cedeaab39803c549bec86a970758](https://github.com/mrjackwills/leafcast_vue/commit/8ed59691a840cedeaab39803c549bec86a970758)

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.7.2'>v0.7.2</a>
### 2022-01-17

### Chores
+ release.sh v0.0.6, [9e639441d99f09fa2621d74f29bb6d730c1e6465](https://github.com/mrjackwills/leafcast_vue/commit/9e639441d99f09fa2621d74f29bb6d730c1e6465)
+ npm update, [7e4a6424932f26b5668903df4fec9e8eb96256d3](https://github.com/mrjackwills/leafcast_vue/commit/7e4a6424932f26b5668903df4fec9e8eb96256d3)

### Features
+ envs into vanilla/env, [1a37f983fcf41c2bad03ff9877b4f001b636f035](https://github.com/mrjackwills/leafcast_vue/commit/1a37f983fcf41c2bad03ff9877b4f001b636f035)

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.7.1'>v0.7.1</a>
### 2022-01-09

### Chores
+ npm update, [9e21e4a7c3ea1857faac7235a7e7d70c9aa5a285](https://github.com/mrjackwills/leafcast_vue/commit/9e21e4a7c3ea1857faac7235a7e7d70c9aa5a285)
+ dev container Dockerfile bump, [1e246aab7f4b71be33fadcc93592da91860114fc](https://github.com/mrjackwills/leafcast_vue/commit/1e246aab7f4b71be33fadcc93592da91860114fc)
+ release.sh update, [1bc33e98f108714cbea627474c8a4dd24836f859](https://github.com/mrjackwills/leafcast_vue/commit/1bc33e98f108714cbea627474c8a4dd24836f859)

### Refactors
+ xStore > xModule + into module dir, [d56c06b8cba4367670f44ca2e18410fa0ea98280](https://github.com/mrjackwills/leafcast_vue/commit/d56c06b8cba4367670f44ca2e18410fa0ea98280)

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.7.0'>v0.7.0</a>
### 2021-12-04

### Chores
+ npm update, [6fda709d6e999be991ef7297fbdbc1db92f59516](https://github.com/mrjackwills/leafcast_vue/commit/6fda709d6e999be991ef7297fbdbc1db92f59516), [9c2bd4f654fbacbabefa099a16153f9d76cb6353](https://github.com/mrjackwills/leafcast_vue/commit/9c2bd4f654fbacbabefa099a16153f9d76cb6353), [08a5c7cc1171afaa919d5db1df2cadbe931a0e3e](https://github.com/mrjackwills/leafcast_vue/commit/08a5c7cc1171afaa919d5db1df2cadbe931a0e3e)

### Features
+ video page/location, for showing timelapses, [864c7b4c900f1ae737f86dab012976cfa466ab4c](https://github.com/mrjackwills/leafcast_vue/commit/864c7b4c900f1ae737f86dab012976cfa466ab4c) (origin/dev), [c1aa84da784e187684badd97534856fe6129ad09](https://github.com/mrjackwills/leafcast_vue/commit/c1aa84da784e187684badd97534856fe6129ad09)
+ replace vuex with pinia, [d1168edbd4a0cc0b7b8bf1970854974fa4d04ef1](https://github.com/mrjackwills/leafcast_vue/commit/d1168edbd4a0cc0b7b8bf1970854974fa4d04ef1)
+ update secondsToString & refactor out zeropad, [851512c63e2d895ba5ddef438bbaf1fc4ab5b57b](https://github.com/mrjackwills/leafcast_vue/commit/851512c63e2d895ba5ddef438bbaf1fc4ab5b57b)
+ mono-numbers class in variables.scss, [7c0e9361dd6df9191a8f99f0f169328cc18d6e25](https://github.com/mrjackwills/leafcast_vue/commit/7c0e9361dd6df9191a8f99f0f169328cc18d6e25)

### Fixes
+ webpack config, remove fibers, [9a294e5b5f10aea34f92c6d26de8813550a15d5b](https://github.com/mrjackwills/leafcast_vue/commit/9a294e5b5f10aea34f92c6d26de8813550a15d5b)
+ release.sh, [c7cb4a7575062a59ec67ed4d3ecc39ece133ba95](https://github.com/mrjackwills/leafcast_vue/commit/c7cb4a7575062a59ec67ed4d3ecc39ece133ba95), [c791b7a8c32998dbaa75a307587693e5011cb294](https://github.com/mrjackwills/leafcast_vue/commit/c791b7a8c32998dbaa75a307587693e5011cb294)



# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.6.2'>v0.6.2</a>
#### 2021-11-07

### Chores
+ release.sh updated, [e4e6e4f9af4c383d339b71652f85856a3a86a548](https://github.com/mrjackwills/leafcast_vue/commit/e4e6e4f9af4c383d339b71652f85856a3a86a548), [6fe8bfb51cc825b8879863aaa0ea0d7a8c20e7b6](https://github.com/mrjackwills/leafcast_vue/commit/6fe8bfb51cc825b8879863aaa0ea0d7a8c20e7b6)

### Features
+ initCheck x3 before signout, [a5ebfa57a0b7f395e35752e22cc2c4634d5bc7bc](https://github.com/mrjackwills/leafcast_vue/commit/a5ebfa57a0b7f395e35752e22cc2c4634d5bc7bc)
+ beforeCreate beforepromptinstall prevented, [d425c42f82e7b30700248d228801e7ff848e54e4](https://github.com/mrjackwills/leafcast_vue/commit/d425c42f82e7b30700248d228801e7ff848e54e4)

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.6.1'>v0.6.1</a>
#### 2021-11-03

### Chores
+ npm update, [96060cbff2382ef4746f887e462d6d239b05af4c](https://github.com/mrjackwills/leafcast_vue/commit/96060cbff2382ef4746f887e462d6d239b05af4c)

### Features
+ devcontainer added, [6a7c05d7312b50938c2b6abe233283c2777efcd5](https://github.com/mrjackwills/leafcast_vue/commit/6a7c05d7312b50938c2b6abe233283c2777efcd5)
+ release.sh added, [1757c9930483cf9aa8febe02668d1bf29630a8cc](https://github.com/mrjackwills/leafcast_vue/commit/1757c9930483cf9aa8febe02668d1bf29630a8cc) & [213987b1a93540b66fee6277c6208111049ce071](https://github.com/mrjackwills/leafcast_vue/commit/213987b1a93540b66fee6277c6208111049ce071)

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.6.0'>v0.6.0</a>
#### 2021-08-16

### Chores
+ dependancies updated, [581766c779c4f6e19e355fcca6f97896e8b6b774](https://github.com/mrjackwills/leafcast_vue/commit/581766c779c4f6e19e355fcca6f97896e8b6b774)

### Features
+ router use dynamic imports for component views, [e42eef6b04b7a517a805f8d99a2457b16b911cac](https://github.com/mrjackwills/leafcast_vue/commit/e42eef6b04b7a517a805f8d99a2457b16b911cac)
+ ws class public closeWs method, [80e8c0266e2ce336fe407099f99b15d8018346a9](https://github.com/mrjackwills/leafcast_vue/commit/80e8c0266e2ce336fe407099f99b15d8018346a9)

### Refactors
+ dead code removed, [2366c327570cbdea707cc8b4e76ce573add2d6c2](https://github.com/mrjackwills/leafcast_vue/commit/2366c327570cbdea707cc8b4e76ce573add2d6c2)

### Styles
+ function return typescript syntax unified, [5bc0cc46157d850e68c61e3e9ae19de5f7c4abea](https://github.com/mrjackwills/leafcast_vue/commit/5bc0cc46157d850e68c61e3e9ae19de5f7c4abea)


# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.5.1'>v0.5.1</a>
#### 2021-07-31

### Chores
+ dependancies updated, [7be3cd1472effad391a2199d9edbdf860d6b8f2d](https://github.com/mrjackwills/leafcast_vue/commit/7be3cd1472effad391a2199d9edbdf860d6b8f2d)

### Fixes
+ DisplayRows.vue width increased, [68a0560260b280d82db3a8496b7ba6d951f17b2e](https://github.com/mrjackwills/leafcast_vue/commit/68a0560260b280d82db3a8496b7ba6d951f17b2e)


# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.5.0'>v0.5.0</a>
#### 2021-07-29

### Chores
+ dependancies updated, [d6ddacff0a15bb7f7effd8f386d7e6bad0defa53](https://github.com/mrjackwills/leafcast_vue/commit/d6ddacff0a15bb7f7effd8f386d7e6bad0defa53)

### Features
+ use browser WebSocket instead of ws, [9beed907ad449828bfd85663fd4f4e0e7cc93d33](https://github.com/mrjackwills/leafcast_vue/commit/9beed907ad449828bfd85663fd4f4e0e7cc93d33)

### Refactors
+ unused dependancies removed, [957c32920cff89715862aab5ac4362f7f4a9da1b](https://github.com/mrjackwills/leafcast_vue/commit/957c32920cff89715862aab5ac4362f7f4a9da1b)

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.4.1'>v0.4.1</a>
#### 2021-07-23

### Fixes
+ ImageMetaData.vue - set Sunday as day 0

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.4.0'>v0.4.0</a>
#### 2021-07-21

### Chores
+ dependancies updated, [9e5cd792c537f23e81aa802abac172f1ea6d301a](https://github.com/mrjackwills/leafcast_vue/commit/9e5cd792c537f23e81aa802abac172f1ea6d301a) & [9dcc05312482b0befbbc32361231210b1b7df247](https://github.com/mrjackwills/leafcast_vue/commit/9dcc05312482b0befbbc32361231210b1b7df247)

### Fixes
+ photo timestamp as date/string rahter than number, custom formatter to display [101018a01a3b9bb692f75862ce57c0240cd48b18](https://github.com/mrjackwills/leafcast_vue/commit/101018a01a3b9bb692f75862ce57c0240cd48b18)


# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.3.2'>v0.3.2</a>
#### 2021-06-20

### Chores
+ dependancies updated, [4e781726c5f08d79f83bd28939eec6dede736db1](https://github.com/mrjackwills/leafcast_vue/commit/4e781726c5f08d79f83bd28939eec6dede736db1)

### Fixes
+ vh fix class name fixed, [a50c9fcd4966eebb07a810a99e7257c6cc541280](https://github.com/mrjackwills/leafcast_vue/commit/a50c9fcd4966eebb07a810a99e7257c6cc541280)
+ image border radius reduced, [fa2ef8133a577e7035ba6826c070bd8f3d1ce5cb](https://github.com/mrjackwills/leafcast_vue/commit/fa2ef8133a577e7035ba6826c070bd8f3d1ce5cb)

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.3.1'>v0.3.1</a>
#### 2021-06-14

### Fixes
+ set loading to false on logout, [cf24805826e99b110006bcc5a3d0d4f6d77710d9](https://github.com/mrjackwills/leafcast_vue/commit/cf24805826e99b110006bcc5a3d0d4f6d77710d9)
+ only set init in Home.vue, [2ad5df2ccd29cc95fedb701ad8b28c08d600aa43](https://github.com/mrjackwills/leafcast_vue/commit/2ad5df2ccd29cc95fedb701ad8b28c08d600aa43)


# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.3.0'>v0.3.0</a>
#### 2021-06-14

### Features
+ piOffline component, above imageMetaData, only visible when !piOnline, [93feb3e506ff426822eb6cb2b56ec6ca262d2abe](https://github.com/mrjackwills/leafcast_vue/commit/93feb3e506ff426822eb6cb2b56ec6ca262d2abe)
+ tooltip on toolbar icon, [acd9408dbc3cfd1f9214b06beefd45ec909b520a](https://github.com/mrjackwills/leafcast_vue/commit/acd9408dbc3cfd1f9214b06beefd45ec909b520a)

### Fixes
+ footer links to github profile rather the vue repo, [0dbc5e2be009539df6c9a23903fb352441affda3](https://github.com/mrjackwills/leafcast_vue/commit/0dbc5e2be009539df6c9a23903fb352441affda3)

### Refactors
+ DisplayRows component moved into authenticated folder, [d4085bee536a8ae4f5ede43291ab1e39a9011bd3](https://github.com/mrjackwills/leafcast_vue/commit/d4085bee536a8ae4f5ede43291ab1e39a9011bd3)


# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.2.1'>v0.2.1</a>
#### 2021-06-13

### Chores
+ dependancies updated, [aef27605de5b0d562be0cf0210dfb6c28ba4f6d2](https://github.com/mrjackwills/leafcast_vue/commit/aef27605de5b0d562be0cf0210dfb6c28ba4f6d2)

### Fixes
+ pwa update snack message lowercased, [91bc7b7115dd3e1cbc8294e9a5e94c9dfbb2bfc1](https://github.com/mrjackwills/leafcast_vue/commit/91bc7b7115dd3e1cbc8294e9a5e94c9dfbb2bfc1)
+ readme link to pi repo fixed, [91bc7b7115dd3e1cbc8294e9a5e94c9dfbb2bfc1](https://github.com/mrjackwills/leafcast_vue/commit/91bc7b7115dd3e1cbc8294e9a5e94c9dfbb2bfc1)
+ update piStatusModuleInit after all other vuex data has been set, [c53599e0f77e919aba779cdd492b6b63b265a7f1](https://github.com/mrjackwills/leafcast_vue/commit/c53599e0f77e919aba779cdd492b6b63b265a7f1)

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.2.0'>v0.2.0</a>
#### 2021-06-13

### Features
+ COMMENTED OUT - show "cached imaged" overlay on image when !piOnline, [fcf7a99077508adba55b78e7508624b2feee8d77](https://github.com/mrjackwills/leafcast_vue/commit/fcf7a99077508adba55b78e7508624b2feee8d77)
+ new data from pi, total # files, total file size, display in PiInfo component, [fcf7a99077508adba55b78e7508624b2feee8d77](https://github.com/mrjackwills/leafcast_vue/commit/fcf7a99077508adba55b78e7508624b2feee8d77)
+ DisplayRows component to iterate over data to be displayed in simple data table, [4e5425bff0087fe6936aac3e534038687b1f101d](https://github.com/mrjackwills/leafcast_vue/commit/4e5425bff0087fe6936aac3e534038687b1f101d)
+ uptime & node uptime increase with each countdown interval, [4e5425bff0087fe6936aac3e534038687b1f101d](https://github.com/mrjackwills/leafcast_vue/commit/4e5425bff0087fe6936aac3e534038687b1f101d)

### Fixes
+ send a request for a new photo at when countdown is 1, instead of 5, [3c0997a616c011c40bc2820ca80006a4e1c3cc5d](https://github.com/mrjackwills/leafcast_vue/commit/3c0997a616c011c40bc2820ca80006a4e1c3cc5d)
+ refresh pi button disabled if loading, [777547ae285c52df4fcae2c097b4ec7abe7180b2](https://github.com/mrjackwills/leafcast_vue/commit/777547ae285c52df4fcae2c097b4ec7abe7180b2)
+ toolbar logo computed width use pixels instead of rems, [370d4c078142fe2a7201dbf715714777710364c1](https://github.com/mrjackwills/leafcast_vue/commit/370d4c078142fe2a7201dbf715714777710364c1)
+ Only show the photo take ago (hour, minute, second) if the image is from cache, [f03331e9d9de43070b5fd941966c5010c6c8f800](https://github.com/mrjackwills/leafcast_vue/commit/f03331e9d9de43070b5fd941966c5010c6c8f800)
+ logout if no ws message in first 5000ms of ws connection, [2f150909798e42103c45bfc28bd3e1adc5008959](https://github.com/mrjackwills/leafcast_vue/commit/2f150909798e42103c45bfc28bd3e1adc5008959)
+ check not in login route before router push login, [d100f26d96e876590d3a954d7c7a7444d7a2f123](https://github.com/mrjackwills/leafcast_vue/commit/d100f26d96e876590d3a954d7c7a7444d7a2f123)
+ toolbar title colour changed to off white, [ca614b2fc0f81c5547fc72d09c5c44045ee6c2d1](https://github.com/mrjackwills/leafcast_vue/commit/ca614b2fc0f81c5547fc72d09c5c44045ee6c2d1)

### Refactors
+ destructure data from axios request, [72dd69990b66d6df2452dbd336068130ae081364](https://github.com/mrjackwills/leafcast_vue/commit/72dd69990b66d6df2452dbd336068130ae081364)
+ Toolbar logo made transparent, [31ee4865dc71a29061546ab0df0c56543e764fa1](https://github.com/mrjackwills/leafcast_vue/commit/31ee4865dc71a29061546ab0df0c56543e764fa1)
+ types updated to match backend client, [4e5425bff0087fe6936aac3e534038687b1f101d](https://github.com/mrjackwills/leafcast_vue/commit/4e5425bff0087fe6936aac3e534038687b1f101d)
+ piNodeUptime & piUptime renamed to nodeUptime & uptime, [4e5425bff0087fe6936aac3e534038687b1f101d](https://github.com/mrjackwills/leafcast_vue/commit/4e5425bff0087fe6936aac3e534038687b1f101d)

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.1.0'>v0.1.0</a>
#### 2021-06-11

### Features
+ init commit
