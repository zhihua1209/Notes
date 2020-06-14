new Vue({
  el: '#notebook',
  data() {
    return {
      content: localStorage.getItem('content')||'you can get in markdown',
      notes:JSON.parse(localStorage.getItem('notes'))||[],
      selectedId:localStorage.getItem('select-id')||[]
    }
  },
  computed: {
    // notePreview() {
    //   return marked(this.content)
    // },
    addButtonTitle(){
      return this.notes.length+'note(s)already'
    },
    selectedNote(){
      return this.notes.find(note => note.id === this.selectedId)
    },
    notePreview(){
      return  this.selectedNote?marked(this.selectedNote.content):''
    }
  },
  watch: {
    content:'saveNote',
    notes:{
      handler:'saveNotes',
      deep:true
    },
    selectedId(val){
      localStorage.setItem('select-id',val)
    }
  },
  methods:{
    saveNote(val){
      console.log(this.content,val)
      localStorage.setItem('content',val)
    },
    //添加笔记
    addNote(){
      const time =Date.now()
      const note={
        id:String(time),
        title:'New note '+(this.notes.length+1),
        content:'**hi,this is notebook is using**',
        created:time,
        favorite:false
      }
      this.notes.push(note)
    },
    //选中的项
    selectNote(note){
      this.selectedId=note.id
      console.log(this.selectedId)
    },
    //保存笔记
    saveNotes(){
      localStorage.setItem('notes',JSON.stringify(this.notes))
    }
  }
})