const onlyDigits = (val)=>/(?=.*\d)/.test(val)

const strongPsw = (password1)=> {
    return (
      /[a-z]/.test(password1) && // checks for a-z
      /[0-9]/.test(password1) && // checks for 0-9
      /\W|_/.test(password1) && // checks for special char
      password1.length >= 6
    );
 }
//  export function isNameJoe(value) {
//     if (!value) return true;
//     return value === "Joe";
//   }
  
//   export function notGmail(value = "") {
//     return !value.includes("gmail");
//   }
  
//   export function isEmailAvailable(value) {
//     if (value === "") return true;
  
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(value.length > 10);
//       }, 500);
//     });
//   }

// validation rules
// validMinPrice() {
//     console.log("hm:",this.$v.minPrice.$dirty && !this.$v.minPrice.maxValue)
//     return this.$v.minPrice.$dirty && !this.$v.minPrice.decimal;
// },
// validMaxPrice() {
// return this.$v.maxPrice.$dirty && !this.$v.maxprice.between;
// },
// compairMinMaxPrice(){
//     if(this.minPrice&&this.maxPrice){
//         return this.minPrice>this.maxPrice
//     }else{
//         return ''
//     }
// }     
// validations:{
//     minPrice:{
//         between:between(0,10),
//         numeric,
//         minValue:minValue(0),
//         maxValue:maxValue(9)
//     },
//     maxPrice:{
//         between:between(1,100),
//         decimal,
//         minValue:minValue(0),
//         maxValue:maxValue(100)
//     }
    
// },   

 export {onlyDigits,strongPsw}