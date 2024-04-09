import React from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UpgradePremium from './UpgradePremium';

function FriendList() {
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 20,
          borderWidth: 1,
          borderColor: '#F8F9FAFF',
          margin: 5,
          paddingBottom: 12,
          marginBottom: 10,
        }}>
        <View
          style={{
            paddingTop: 20,

            marginLeft: 10,
            alignItems: 'center',
          }}>
          <Image
            style={{width: 65, height: 65, borderRadius: 50}}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmFvsTU3oFayIDR7Amtxqh-No6UhNpolgVCSFk2dl01g&s',
            }}
          />
          <View
            style={{
              paddingTop: 8,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 0,
            }}>
            <AntDesign name="star" size={10} color="orange" />
            <AntDesign name="star" size={10} color="orange" />
            <AntDesign name="star" size={10} color="orange" />
            <AntDesign name="star" size={10} color="orange" />
            <AntDesign name="star" size={10} color="orange" />
          </View>
        </View>
        <View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'start',
                justifyContent: 'space-between',
                gap: 65,
              }}>
              <View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'sans-serif',
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#171A1FFF',
                      lineHeight: 30,
                    }}>
                    Johnny Oslin
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#F3F4F6FF',
                    padding: 4,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'sans-serif',
                      fontSize: 11,
                      fontWeight: '700',
                      color: '#323743FF',
                    }}>
                    1,634 followers
                  </Text>
                </View>
              </View>
              <View>
                <View style={{backgroundColor: '#F5F1FEFF', borderRadius: 10}}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'sans-serif',
                      lineHeight: 11,
                      fontWeight: '400',
                      color: '#6D31EDFF',
                      padding: 6,
                      marginTop: 5,
                    }}>
                    Top Performer
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  width: 104,
                  backgroundColor: '#6D31EDFF',
                  padding: 6,
                  borderRadius: 4,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    lineHeight: 18,
                    fontFamily: 'sans-serif',
                    textAlign: 'center',
                    color: '#ffffff',
                  }}>
                  Call
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 104,
                  borderWidth: 1,
                  borderColor: '#6D31EDFF',
                  padding: 6,
                  borderRadius: 4,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    lineHeight: 18,
                    fontFamily: 'sans-serif',
                    textAlign: 'center',
                    color: '#6D31EDFF',
                  }}>
                  Following
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 20,
          borderWidth: 1,
          borderColor: '#F8F9FAFF',
          margin: 5,
          paddingBottom: 12,
          marginBottom: 10,
        }}>
        <View
          style={{
            paddingTop: 20,

            marginLeft: 10,
            alignItems: 'center',
          }}>
          <Image
            style={{width: 65, height: 65, borderRadius: 50}}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmFvsTU3oFayIDR7Amtxqh-No6UhNpolgVCSFk2dl01g&s',
            }}
          />
          <View
            style={{
              paddingTop: 8,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 0,
            }}>
            <AntDesign name="star" size={10} color="orange" />
            <AntDesign name="star" size={10} color="orange" />
            <AntDesign name="star" size={10} color="orange" />
            <AntDesign name="star" size={10} color="orange" />
            <AntDesign name="star" size={10} color="orange" />
          </View>
        </View>
        <View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'start',
                justifyContent: 'space-between',
                gap: 65,
              }}>
              <View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'sans-serif',
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#171A1FFF',
                      lineHeight: 30,
                    }}>
                    Johnny Oslin
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#F3F4F6FF',
                    padding: 4,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'sans-serif',
                      fontSize: 11,
                      fontWeight: '700',
                      color: '#323743FF',
                    }}>
                    1,634 followers
                  </Text>
                </View>
              </View>
              <View>
                <View style={{backgroundColor: '#F5F1FEFF', borderRadius: 10}}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'sans-serif',
                      lineHeight: 11,
                      fontWeight: '400',
                      color: '#6D31EDFF',
                      padding: 6,
                      marginTop: 5,
                    }}>
                    Top Performer
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  width: 104,
                  backgroundColor: '#6D31EDFF',
                  padding: 6,
                  borderRadius: 4,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    lineHeight: 18,
                    fontFamily: 'sans-serif',
                    textAlign: 'center',
                    color: '#ffffff',
                  }}>
                  Call
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 104,
                  borderWidth: 1,
                  borderColor: '#6D31EDFF',
                  padding: 6,
                  borderRadius: 4,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    lineHeight: 18,
                    fontFamily: 'sans-serif',
                    textAlign: 'center',
                    color: '#6D31EDFF',
                  }}>
                  Following
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 20,
          borderWidth: 1,
          borderColor: '#F8F9FAFF',
          margin: 5,
          paddingBottom: 12,
          marginBottom: 10,
        }}>
        <View
          style={{
            paddingTop: 20,

            marginLeft: 10,
            alignItems: 'center',
          }}>
          <Image
            style={{width: 65, height: 65, borderRadius: 50}}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmFvsTU3oFayIDR7Amtxqh-No6UhNpolgVCSFk2dl01g&s',
            }}
          />
          <View
            style={{
              paddingTop: 8,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 0,
            }}>
            <AntDesign name="star" size={10} color="orange" />
            <AntDesign name="star" size={10} color="orange" />
            <AntDesign name="star" size={10} color="orange" />
            <AntDesign name="star" size={10} color="orange" />
            <AntDesign name="star" size={10} color="orange" />
          </View>
        </View>
        <View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'start',
                justifyContent: 'space-between',
                gap: 65,
              }}>
              <View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'sans-serif',
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#171A1FFF',
                      lineHeight: 30,
                    }}>
                    Johnny Oslin
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#F3F4F6FF',
                    padding: 4,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'sans-serif',
                      fontSize: 11,
                      fontWeight: '700',
                      color: '#323743FF',
                    }}>
                    1,634 followers
                  </Text>
                </View>
              </View>
              <View>
                <View style={{backgroundColor: '#F5F1FEFF', borderRadius: 10}}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'sans-serif',
                      lineHeight: 11,
                      fontWeight: '400',
                      color: '#6D31EDFF',
                      padding: 6,
                      marginTop: 5,
                    }}>
                    Top Performer
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  width: 104,
                  backgroundColor: '#6D31EDFF',
                  padding: 6,
                  borderRadius: 4,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    lineHeight: 18,
                    fontFamily: 'sans-serif',
                    textAlign: 'center',
                    color: '#ffffff',
                  }}>
                  Call
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 104,
                  borderWidth: 1,
                  borderColor: '#6D31EDFF',
                  padding: 6,
                  borderRadius: 4,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    lineHeight: 18,
                    fontFamily: 'sans-serif',
                    textAlign: 'center',
                    color: '#6D31EDFF',
                  }}>
                  Following
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 20,
          borderWidth: 1,
          borderColor: '#F8F9FAFF',
          margin: 5,
          paddingBottom: 12,
          marginBottom: 10,
        }}>
        <View
          style={{
            paddingTop: 20,

            marginLeft: 10,
            alignItems: 'center',
          }}>
          <Image
            style={{width: 65, height: 65, borderRadius: 50}}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmFvsTU3oFayIDR7Amtxqh-No6UhNpolgVCSFk2dl01g&s',
            }}
          />
          <View
            style={{
              paddingTop: 8,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 0,
            }}>
            <AntDesign name="star" size={10} color="orange" />
            <AntDesign name="star" size={10} color="orange" />
            <AntDesign name="star" size={10} color="orange" />
            <AntDesign name="star" size={10} color="orange" />
            <AntDesign name="star" size={10} color="orange" />
          </View>
        </View>
        <View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'start',
                justifyContent: 'space-between',
                gap: 65,
              }}>
              <View>
                <View>
                  <Text
                    style={{
                      fontFamily: 'sans-serif',
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#171A1FFF',
                      lineHeight: 30,
                    }}>
                    Johnny Oslin
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#F3F4F6FF',
                    padding: 4,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'sans-serif',
                      fontSize: 11,
                      fontWeight: '700',
                      color: '#323743FF',
                    }}>
                    1,634 followers
                  </Text>
                </View>
              </View>
              <View>
                <View style={{backgroundColor: '#F5F1FEFF', borderRadius: 10}}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'sans-serif',
                      lineHeight: 11,
                      fontWeight: '400',
                      color: '#6D31EDFF',
                      padding: 6,
                      marginTop: 5,
                    }}>
                    Top Performer
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  width: 104,
                  backgroundColor: '#6D31EDFF',
                  padding: 6,
                  borderRadius: 4,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    lineHeight: 18,
                    fontFamily: 'sans-serif',
                    textAlign: 'center',
                    color: '#ffffff',
                  }}>
                  Call
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 104,
                  borderWidth: 1,
                  borderColor: '#6D31EDFF',
                  padding: 6,
                  borderRadius: 4,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    lineHeight: 18,
                    fontFamily: 'sans-serif',
                    textAlign: 'center',
                    color: '#6D31EDFF',
                  }}>
                  Following
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <UpgradePremium />
    </>
  );
}

export default FriendList;
