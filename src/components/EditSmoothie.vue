<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <h4 class="center purple-text">Edit {{ smoothie.title }}</h4>
    
        <form @submit.prevent="EditSmoothie" class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" name="title" v-model="smoothie.title" required>
                </div>
            </div>
            <div v-for="(ing, index) in smoothie.ingredents" class="ing" :key="index">
                <label for="ingredent">Ingredent</label>
                <input type="text" name="ingredent" v-model="smoothie.ingredents[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input type="text" name="ingredents" v-model="another"  @keydown.tab.prevent="addIng">
                    <label for="ingredents"> Ingredents: </label>
                </div>
            </div>
            <p v-if="feedback" class="red-text">{{feedback}}</p>
            <router-link :to="{name: 'dashboard'}" class="btn-small grey"> Back </router-link>
            <button type="submit" class="btn-small deep-purple accent-1 right"> Update </button>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

export default {
    name: 'EditSmoothie',
    data(){
        return{
            smoothie : null,
            another: null,
            feedback: null,
            
        }
    },
    created(){
        db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug).get()
        .then(snapShot =>{
            snapShot.forEach(doc=> {
                //consol.log(doc.data());
                this.smoothie = doc.data();
                this.smoothie.id = doc.id
            })
        })
    },
    methods:{
        addIng(){
            if(this.another){
                this.smoothie.ingredents.push(this.another);
                this.another = null;
                this.feedback = null
            }else{
                this.feedback = "You must enter a value to add ingredent."
            }
        },
        deleteIng(ing){
            this.smoothie.ingredents = this.smoothie.ingredents.filter(ingredent =>{
                return ingredent !== ing;
            })
        },
        EditSmoothie(){
             if(this.smoothie.title){
                this.feedback = null;

                //Create slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                });

                db.collection('smoothies').doc(this.smoothie.id).update({
                    title : this.smoothie.title,
                    ingredents : this.smoothie.ingredents,
                    slug: this.smoothie.slug
                }).then(()=>{
                    this.$router.push({name: 'dashboard'})
                }).catch(err=>{
                    alert(err);
                })
            }else{
                this.feedback =" You must enter a food title."
            }
        }
    }
}
</script>


<style>
     .edit-smoothie{
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }
    .edit-smoothie h2{
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
