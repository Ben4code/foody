<template>
    <div class="add-smoothie container">

        <h4 class="center purple-text">Add Smoothie</h4>

        <div class="row">
            <form @submit.prevent="AddSmoothie" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" name="title" v-model="title" required>
                        <label for="title"> Title: </label>
                    </div>
                </div>
                <div v-for="(ing, index) in ingredents" class="ing" :key="index">
                    <label for="ingredent">Ingredent</label>
                    <input type="text" name="ingredent" v-model="ingredents[index]" disabled>
                    <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" name="ingredents" v-model="another" @keydown.tab.prevent="addIng">
                        <label for="ingredents"> Ingredents: </label>
                    </div>
                </div>
                <router-link :to="{name: 'dashboard'}" class="btn-small grey"> Back </router-link>
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button type="submit" class="btn-small deep-purple accent-1 right"> Add </button>
            </form>
        </div>

    </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
    data(){
        return{
            title: '',
            ingredents: [],
            another: null,
            feedback: null,
            slug: null
        }
    },
    methods: {
        AddSmoothie(){
            if(this.title){
                this.feedback = null;

                //Create slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                });

                db.collection('smoothies').add({
                    title : this.title,
                    ingredents : this.ingredents,
                    slug: this.slug
                }).then(()=>{
                    this.$router.push({name: 'dashboard'})
                }).catch(err=>{
                    alert(err);
                })
            }else{
                this.feedback =" You must enter a food title."
            }
        },
        addIng(){
            if(this.another){
                this.ingredents.push(this.another);
                this.another = null;
                this.feedback = null
            }else{
                this.feedback = "You must enter a value to add ingredent."
            }
        },
        deleteIng(ing){
            this.ingredents = this.ingredents.filter(ingredent =>{
                return ingredent !== ing;
            })
        }
    }
}
</script>

<style>
    .add-smoothie{
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }
    .add-smoothie h2{
        font-size: 2em;
        margin: 20px auto;
    }
    .ing{
        margin: 40px auto;
        position: relative;
    }
     .delete{
        position: absolute;
        top: 4px;
        right: 4px;
        cursor: pointer;
        color: #aaa;
        font-size: 1.4em;
    }
</style>
