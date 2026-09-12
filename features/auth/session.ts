import AsyncStorage from '@react-native-async-storage/async-storage'; import type {Profile} from '@/types';
const key='medi-bud-demo-profile';
export const demoProfile:Profile={id:'demo-aarav',name:'Aarav',age:21,heightCm:175,weightKg:68,goals:['Fitness','Nutrition'],dietaryPreference:'Vegetarian',language:'English',foodPreferences:['Dal + Roti','Paneer tikka','South Indian'],conditions:[],allergies:[],onboardingComplete:true,isDemo:true};
export async function loadDemo(){const raw=await AsyncStorage.getItem(key);return raw?JSON.parse(raw) as Profile:null}
export async function saveDemo(profile:Profile){await AsyncStorage.setItem(key,JSON.stringify(profile))}
export async function clearDemo(){await AsyncStorage.removeItem(key)}
