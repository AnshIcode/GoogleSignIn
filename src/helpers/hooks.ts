import { useEffect } from "react";
import { Linking } from "react-native";
import { handleDeepLinks } from "./helper";

export const useDeepLinking = () => {
	useEffect(() => {
	  const getUrlAsync = async () => {
		const initialUrl = await Linking.getInitialURL();
		console.log('initialUrl', initialUrl)
		if (initialUrl) {
		  handleDeepLinks(initialUrl);
		}
  
		const subscription = Linking.addEventListener('url', ({ url }) => {
			console.log('url', url)
		  handleDeepLinks(url);
		});
  
		return () => subscription.remove();
	  };
  
	  getUrlAsync();
	}, []);
  };