import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Network from 'expo-network';

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const checkNetworkStatus = async () => {
      const status = await Network.getNetworkStateAsync();
      setIsConnected(status.isConnected);
    };

    checkNetworkStatus();

    const interval = setInterval(checkNetworkStatus, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return isConnected;
};

const OfflineNotice = () => {
  const isConnected = useNetworkStatus();

  if (!isConnected) {
    return (
      <View style={{ backgroundColor: 'red', padding: 10 }}>
        <Text style={{ color: 'white' }}>No Internet Connection</Text>
      </View>
    );
  }

  return null;
};

export default OfflineNotice;