<template v-bind:style="{ background: activeColor}">
<div class='main'>
<div class='container'>
    <div class='logo'>
    <span class="namelabel"><img class="img" alt="NotePad Logo" height="60" width="60" src="../assets/pencil.png">NoteKeeper</span>
    </div>
  <div class="create-post">
    <input type="text" size="20" style="background-color: #000000; color: #D8D8D8; border-color: #343a40; height:30px;font-size:14pt;" id="create-post" v-model="text" placeholder="Create or Edit a Note...." @keyup.enter="makePost()">
    <img class="savePost" style = "position:relative; top:10px;" src='../assets/save.png' width="35" height="35" v-on:click="makePost()">
    <img style = "position:relative; top:10px;" src='../assets/recycling-bin.png' width="35" height="35" v-on:click="nukePosts">
    </div>

  <hr>
  <p class="error" v-if="error">{{ error }}</p>
  <div class="posts-container">
    <div class = "post"
      v-for="(post, index) in posts"
      v-bind:item="post"
      v-bind:index="index"
      v-bind:key="post._id"
      >
        <p class="date"><small>{{ `${post.createdAt.getMonth()}/${post.createdAt.getDate()}/${post.createdAt.getFullYear()}` }}</small></p>
       <p class='edited' v-if="post.edited"><small>Edited</small></p>
       <div class="text">
       <div class="message"style='word-break: break-all; word-wrap: break-word; max-width: 200'>
        <p><b>{{ post.text }}</b></p>
      </div>
       <img class="editpost" src="../assets/pencil.png"v-on:click="beginEdit(post)" />
      <img class="delpost" src="../assets/recycling-bin.png"v-on:click="deletePost(post._id)" />
      </div>
      </div>
    </div>
</div>
</div>
</template>

<script>
let isEdit;
let editid;
import PostService from '../postService.js'
export default {
  name: 'postComponet',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts()
    }
    catch (e){
      this.err = e.message
    }
  },
  
  methods: {
    async makePost() {
      console.log(isEdit, editid)
      if (isEdit === true) {
      isEdit = false
      if (!this.text) return
      await PostService.editPost(editid, this.text)
      this.text = ''
      this.posts = await PostService.getPosts() 
      }

      if (!this.text) return
      await PostService.makePost(this.text)
      this.text = ''
      this.posts = await PostService.getPosts() 
    },
    async beginEdit(post) {
            this.text = post.text
       isEdit = true
       editid = post._id
    },
    async deletePost(id) {
      await PostService.deletePost(id)
      this.posts = await PostService.getPosts() 
    },
    async nukePosts() {
    if (confirm("Delete all posts?")) {
          await PostService.deletePost('nuke')
      this.posts = await PostService.getPosts()
  } else {
    return
  }
    }
}}
</script>
<style scoped>
.img {
   display: inline-block;
     padding-right: 10px;
}
.logo {
  padding-top: 25px;
  padding-bottom: 15px
}
.namelabel {
  padding-left: 10px;
    text-align: center;
  font-size: 65px;
  display: inline-block;
    color: #D8D8D8;

}
.posts-container {
    padding-top: 30px;
}
.create-post {
    padding-bottom: 10px;
    width: 50px;
    display: inline;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: #343a40;
  padding-bottom: 50px;
  padding-top: 20px
}
.main {
  max-width: 100%;
  margin: 0 auto;
  background-color: #343a40;
}
.error {
  border: 1px solid #ffb5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
.message {
    margin-left: auto;
    margin-right: auto;
    padding-top: 15px;
    padding-left: 100px;
    padding-right: 100px;
}
.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color:#bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
.editpost {
  width: 5%;
  max-width: 25px;
  height: auto;
  position: absolute;
  top: 10px;
  right: 45px;
  font-size: 18px;
}
.delpost {
  width: 5%;
  max-width: 25px;
  height: auto;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 18px;
}
.date {
  position: absolute;
  top: 0px;
  left: 16px;
  font-size: 18px;
}
.edited {
  position: absolute;
  top: 25px;
  left: 16px;
  font-size: 16px;
}
.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>