import {addDoc,collection,doc,getDoc,getDocs,limit,orderBy,query,setDoc,where} from 'firebase/firestore';
import {db} from './config'; import type {Meal,Profile,WaterEntry} from '@/types';
const assertDb=()=>{if(!db)throw new Error('Firebase is not configured.');return db};
export async function saveProfile(profile:Profile){await setDoc(doc(assertDb(),'profiles',profile.id),profile,{merge:true})}
export async function getProfile(userId:string){const s=await getDoc(doc(assertDb(),'profiles',userId));return s.exists()?s.data() as Profile:null}
export async function addWater(userId:string,amountMl:number){await addDoc(collection(assertDb(),'users',userId,'water'),{amountMl,createdAt:new Date().toISOString()})}
export async function getWater(userId:string){const s=await getDocs(query(collection(assertDb(),'users',userId,'water'),orderBy('createdAt','desc'),limit(30)));return s.docs.map(d=>({id:d.id,...d.data()} as WaterEntry))}
export async function addMeal(userId:string,meal:Omit<Meal,'id'|'createdAt'>){await addDoc(collection(assertDb(),'users',userId,'meals'),{...meal,createdAt:new Date().toISOString()})}
export async function getMeals(userId:string){const s=await getDocs(query(collection(assertDb(),'users',userId,'meals'),orderBy('createdAt','desc'),limit(20)));return s.docs.map(d=>({id:d.id,...d.data()} as Meal))}
