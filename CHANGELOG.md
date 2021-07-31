# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.5.1'>v0.5.1</a>
#### 2021-07-31

### Chores
+ dependancies updated, [7be3cd1472effad391a2199d9edbdf860d6b8f2d]

### Fixes
+ DisplayRows.vue width increased, [68a0560260b280d82db3a8496b7ba6d951f17b2e]


# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.5.0'>v0.5.0</a>
#### 2021-07-29

### Chores
+ dependancies updated, [d6ddacff0a15bb7f7effd8f386d7e6bad0defa53]

### Features
+ use browser WebSocket instead of ws, [9beed907ad449828bfd85663fd4f4e0e7cc93d33]

### Refactors
+ unused dependancies removed, [957c32920cff89715862aab5ac4362f7f4a9da1b]

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.4.1'>v0.4.1</a>
#### 2021-07-23

### Fixes
+ ImageMetaData.vue - set Sunday as day 0

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.4.0'>v0.4.0</a>
#### 2021-07-21

### Chores
+ dependancies updated, [9e5cd792c537f23e81aa802abac172f1ea6d301a] & [9dcc05312482b0befbbc32361231210b1b7df247]

### Fixes
+ photo timestamp as date/string rahter than number, custom formatter to display [101018a01a3b9bb692f75862ce57c0240cd48b18]


# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.3.2'>v0.3.2</a>
#### 2021-06-20

### Chores
+ dependancies updated, [4e781726c5f08d79f83bd28939eec6dede736db1]

### Fixes
+ vh fix class name fixed, [a50c9fcd4966eebb07a810a99e7257c6cc541280]
+ image border radius reduced, [fa2ef8133a577e7035ba6826c070bd8f3d1ce5cb]

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.3.1'>v0.3.1</a>
#### 2021-06-14

### Fixes
+ set loading to false on logout, [cf24805826e99b110006bcc5a3d0d4f6d77710d9]
+ only set init in Home.vue, [2ad5df2ccd29cc95fedb701ad8b28c08d600aa43]


# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.3.0'>v0.3.0</a>
#### 2021-06-14

### Features
+ piOffline component, above imageMetaData, only visible when !piOnline, [93feb3e506ff426822eb6cb2b56ec6ca262d2abe]
+ tooltip on toolbar icon, [acd9408dbc3cfd1f9214b06beefd45ec909b520a]

### Fixes
+ footer links to github profile rather the vue repo, [0dbc5e2be009539df6c9a23903fb352441affda3]

### Refactors
+ DisplayRows component moved into authenticated folder, [d4085bee536a8ae4f5ede43291ab1e39a9011bd3]


# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.2.1'>v0.2.1</a>
#### 2021-06-13

### Chores
+ dependancies updated, [aef27605de5b0d562be0cf0210dfb6c28ba4f6d2]

### Fixes
+ pwa update snack message lowercased, [91bc7b7115dd3e1cbc8294e9a5e94c9dfbb2bfc1]
+ readme link to pi repo fixed, [91bc7b7115dd3e1cbc8294e9a5e94c9dfbb2bfc1]
+ update piStatusModuleInit after all other vuex data has been set, [c53599e0f77e919aba779cdd492b6b63b265a7f1]

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.2.0'>v0.2.0</a>
#### 2021-06-13

### Features
+ COMMENTED OUT - show "cached imaged" overlay on image when !piOnline, [fcf7a99077508adba55b78e7508624b2feee8d77]
+ new data from pi, total # files, total file size, display in PiInfo component, [fcf7a99077508adba55b78e7508624b2feee8d77]
+ DisplayRows component to iterate over data to be displayed in simple data table, [4e5425bff0087fe6936aac3e534038687b1f101d]
+ uptime & node uptime increase with each countdown interval, [4e5425bff0087fe6936aac3e534038687b1f101d]

### Fixes
+ send a request for a new photo at when countdown is 1, instead of 5, [3c0997a616c011c40bc2820ca80006a4e1c3cc5d]
+ refresh pi button disabled if loading, [777547ae285c52df4fcae2c097b4ec7abe7180b2]
+ toolbar logo computed width use pixels instead of rems, [370d4c078142fe2a7201dbf715714777710364c1]
+ Only show the photo take ago (hour, minute, second) if the image is from cache, [f03331e9d9de43070b5fd941966c5010c6c8f800]
+ logout if no ws message in first 5000ms of ws connection, [2f150909798e42103c45bfc28bd3e1adc5008959]
+ check not in login route before router push login, [d100f26d96e876590d3a954d7c7a7444d7a2f123]
+ toolbar title colour changed to off white, [ca614b2fc0f81c5547fc72d09c5c44045ee6c2d1]

### Refactors
+ destructure data from axios request, [72dd69990b66d6df2452dbd336068130ae081364]
+ Toolbar logo made transparent, [31ee4865dc71a29061546ab0df0c56543e764fa1]
+ types updated to match backend client, [4e5425bff0087fe6936aac3e534038687b1f101d]
+ piNodeUptime & piUptime renamed to nodeUptime & uptime, [4e5425bff0087fe6936aac3e534038687b1f101d]

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.1.0'>v0.1.0</a>
#### 2021-06-11

### Features
+ init commit