<template>
    <div id="checkboxes"> 
        <form @submit.prevent="sortIt">
            <p>Sort</p>
            <div class="form-check">
                <input class="form-check-input" type="radio" v-model="userChoice" value="lowOnTop"
                id="oldTop" active-class="active">
                <label class="form-check-label" for="lowOnTop">
                    Low price on top
                </label>
            </div>      
            <div class="form-check">
                <input class="form-check-input" type="radio" v-model="userChoice" value="highOnTop" 
                id="newTop" active-class="active">
                <label class="form-check-label" for="highOnTop">
                    High price on top 
                </label>
            </div>             
            <div class="form-check">
                <input class="form-check-input" type="radio" v-model="userChoice" value="aOnTop" 
                id="aTop" active-class="active">
                <label class="form-check-label" for="aTop">
                    A to top 
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" v-model="userChoice" value="zOnTop"
                id="zTop" active-class="active">
                <label class="form-check-label" for="zTop">
                    Z to top
                </label>
            </div>
            <p>Filter</p>
                <!-- <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                        <input v-model="onFront" value="True" type="checkbox" aria-label="Featured">
                        </div>
                    </div>
                    <input type="text" class="form-control" aria-label="Text input with checkbox"
                    placeholder="Featured">
                </div> -->
            
             <!-- <p>Errors</p>
             <p>valid min price</p>
             <b-form-invalid-feedback v-if="validMinPrice" class="invalid-feedback"
            >max price err
            </b-form-invalid-feedback>
            <p>valid max price</p>
             <b-form-invalid-feedback v-if="validMaxPrice" class="invalid-feedback"
            >max price err
            </b-form-invalid-feedback>
            <div v-if="compairMinMaxPrice" class="warning">Min price can't be higher then max</div>         -->
            <div class="">
                <b-button  size="sm" class="my-2  mx-2 mt-2" type="submit">Sort</b-button>       
                <!-- <b-button  size="sm" class="my-2  mx-2 mt-2 btn-success" @click="reset">Reset filter </b-button>        -->

            </div>
        </form>
        <p>next</p>
        <form @submit.prevent="filterIt">
            <label class="sr-only" for="inlineFormInputGroupUsername2">Min</label>
            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                <div class="input-group-text">Min</div>
                </div>
                <input v-model="minPrice" type="text" class="form-control" 
                id="inlineFormInputGroupUsername2" placeholder="price">
            </div>
            
            <label class="sr-only" for="inlineFormInputGroupUsername2">Max</label>
            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                <div class="input-group-text">Max</div>
                </div>
                <input type="text" v-model.lazy="maxPrice" class="form-control" id="inlineFormInputGroupUsername2" placeholder="price">
            </div>
            
            <div class="">
                <b-button  size="sm" class="my-2  mx-2 mt-2" type="submit">Filter</b-button>       
                
            </div>
        </form>
        <b-button  size="sm" class="my-2  mx-2 mt-2 btn-success" @click="reset">Reset all filters </b-button>       

    </div>
</template>

<script>
// import {between,decimal,numeric,minValue, maxValue}  from  "vuelidate/lib/validators";
export default {
    name:'AppUserFilter',
    data(){
        return {
            userChoice:null,
            minPrice:null,
            maxPrice:null                                
        }
    },   
    computed:{
        // user's choice
        passUserChoice(){
            if(this.userChoice==='lowOnTop'){
                return "price"
            }else if(this.userChoice ==='highOnTop') {
                return '-price'
            }    
            else if(this.userChoice==='aOnTop'){
                return 'name'
            
            }else{
                return '-name'
            }
        },
        priceMinMaxChoice(){
            //?price=&min_price=10&max_price=20&in_stock=&name=&categ=
            if(this.minPrice!=null&&this.maxPrice!=null){
                return `?min_price=${this.minPrice.toString()}&max_price=${this.maxPrice.toString()}`
            }else if(this.minPrice!=null){
                return `?min_price=${this.minPrice.toString()}`
            }else if(this.maxPrice!=null){
                return `?max_price=${this.maxPrice.toString()}`
            }else{
                return ''
            }        
        },        
    },
    methods:{
        sortIt(){          
            console.log("param to url for ordering:",this.passUserChoice)
            this.$router.push({name:'sortedBy',params:{sort:this.passUserChoice}}) 
        },
        filterIt(){
            this.$router.push({name:'filterBy',params:{filter:this.priceMinMaxChoice}}) 
        },
        reset(){
            this.userChoice=null,
            this.minPrice=null,
            this.maxPrice=null   
        }
        
    }
}
</script>
<style scoped>
.buts{
    display: flex;
    flex-wrap: wrap;
}
.red {
  color: red;
}
.warning {
  background-color: #f1cfcfa1;
}
.mistake {
  color: red;
  text-align: left;
  font-size: 0.8rem;
}
</style>