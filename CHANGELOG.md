### Chores
+ dependancies updated

### Fixes
+ pwa update snack message lowercased
+ readme link to pi repo fixed
+ update piStatusModuleInit after all other vuex data has been set

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
+ Toolbar logo made transparent [31ee4865dc71a29061546ab0df0c56543e764fa1]
+ types updated to match backend client, [4e5425bff0087fe6936aac3e534038687b1f101d]
+ piNodeUptime & piUptime renamed to nodeUptime & uptime, [4e5425bff0087fe6936aac3e534038687b1f101d]

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.1.0'>v0.1.0</a>
#### 2021-06-11

### Features
+ init commit