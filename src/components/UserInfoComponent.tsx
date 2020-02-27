import React, { useState, useEffect } from 'react'
import { Text, Button, View, AsyncStorage } from 'react-native'
import Colors from '../styles/Colors'
import { useTranslation } from 'react-i18next'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'

interface Props {
  onLogout: () => void   
}

const UserInfoComponent = (props: Props) => {

  const { t } = useTranslation()
  const [userInfo, setUserInfo] = useState<Object|null>(null)

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    const fetchedUserInfo: string|null = await AsyncStorage.getItem('userData')
    setUserInfo(JSON.parse(fetchedUserInfo || '{}'))
  }

  const logout = () => {
    clearUserData()
    props.onLogout()
  }

  // Remove user data from storage
  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem('userData')
    } catch (e) {
      console.log('Error removing user data from storage: ', e)
    }
  }

  return (
    <View>
      <View style={Cs.userInfoContainer}>
        <View style={Ts.userInfoTitle}>
          <Text style={Ts.loggedIn}>
            {userInfo !== null
              ? (t('loggedin') + userInfo.fullName)
              : null
            }
          </Text>
        </View>
        <View style={Cs.logoutButtonContainer}>
          <Button
            color={Colors.negativeColor}
            title={t('logout')}
            onPress={logout}
          />
        </View>
      </View>
    </View>
  )
}

export default UserInfoComponent