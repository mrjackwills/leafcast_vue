### Fixes
+ send a request for a new photo at when countdown is 1, instead of 5, [3c0997a616c011c40bc2820ca80006a4e1c3cc5d]
+ refresh pi button disabled if loading, [777547ae285c52df4fcae2c097b4ec7abe7180b2]
+ toolbar logo computed width use pixels instead of rems [370d4c078142fe2a7201dbf715714777710364c1]
+ Only show the photo take ago (hour, minute, second) if the image is from cache, [f03331e9d9de43070b5fd941966c5010c6c8f800]
+ logout if no ws message in first 5000ms of ws connection, [2f150909798e42103c45bfc28bd3e1adc5008959]
+ check not in login route before router push login, [d100f26d96e876590d3a954d7c7a7444d7a2f123]

### Refactors
+ destructure data from axios request, [72dd69990b66d6df2452dbd336068130ae081364]
+ Toolbar logo made transparent [31ee4865dc71a29061546ab0df0c56543e764fa1]

# <a href='https://github.com/mrjackwills/leafcast_vue/releases/tag/v0.1.0'>v0.1.0</a>
#### 2021-06-11

### Features
+ init commit