export type Profile={id:string;name:string;age?:number;heightCm?:number;weightKg?:number;goals:string[];dietaryPreference:string;language:string;foodPreferences:string[];conditions:string[];allergies:string[];onboardingComplete:boolean;isDemo?:boolean};
export type WaterEntry={id:string;amountMl:number;createdAt:string};
export type Meal={id:string;type:'Breakfast'|'Lunch'|'Dinner'|'Snack';name:string;calories:number;protein:number;carbs:number;fats:number;imageUrl?:string;estimated:boolean;createdAt:string};
export type ChatMessage={id:string;role:'user'|'assistant';text:string;createdAt:string;sources?:string[]};
export type HealthContext={profile:Profile;recentMeals:Meal[];hydration:{totalMl:number;goalMl:number};reports:{id:string;title:string;summary?:string;date:string}[];medications:{name:string;dosage?:string}[];workouts:{title:string;completed:boolean}[];sleep?:{hours:number};mood?:string};
