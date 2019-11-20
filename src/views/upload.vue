<template>
  <div class="upload">
    <Upload 
    :action="`${baseURL}/upload_file`" 
    multiple
    :before-upload="beforeUpload"
    :on-success="handleSuccess"
    ref="upload"
    >
      <Button icon="ios-cloud-upload-outline">Upload files {{baseURL}}</Button>
    </Upload>
    <Button @click="handleClick">上传吧</Button>
    <Table :columns="columns" :data="fileList"></Table>
    <Modal v-model="showModal">
      <div style="height: 300px; overflow: auto; width: 95%; margin: 0 auto;">
        {{content}}
      </div>
    </Modal>
  </div>
</template>
<script>
import {baseURL} from '@/config'
import { getFilesList, getFile, deleteFile } from '@/api/data'
import { downloadFile } from '@/lib/util'
export default {
  data(){
    return {
      content:'',
      showModal:false,
      baseURL,
      file:{},
      columns:[
        { title: '文件key', key: 'key' },
        { title: '文件名', key: 'file_name' },
        { title: '文件类型', key: 'file_type' },
        { title: '文件大小', key: 'file_size' },
        { title: '上传时间', key: 'createdAt' },
        {
          title: '存储有效期',
          key: 'storage_time',
          render: ( h, {row} ) => {
            return (
              <span> {row.storage_time ? row.storage_time : '永久'} </span>
            )
          }
        },
        {
          title: '操作',
          key: 'handle',
          render: (h, { row }) => {
            return (
              <span>
                <i-button on-click={ this.download.bind(this, row.key) }>下载</i-button>
                <i-button disabled={!row.file_type.includes('text')} on-click={this.showFileContent.bind(this, row.key)}>显示内容</i-button>
                <i-button on-click={ this.handleDeleteFile.bind(this, row.key) }>删除</i-button>
              </span>
            )
          }
        },
      ],
      fileList:[]
    }
  },
  methods:{
    beforeUpload (file){
      this.file = file
      return false
    },
    handleSuccess (){
      this.$Message.success('文件上传成功！')
      this.getFiles()
    },
    download (key) {
      downloadFile({
        url:`${baseURL}/get_file`,
        params: {
          key,
          type: 'download'
        }
      })
    },
    showFileContent (key) {
      getFile({
        key,
        type: 'text'
      }).then(res => {
        this.content = res
        this.showModal = true
      })
    },
    handleDeleteFile (key) {
      const leave = confirm('确定删除该文件吗?')
      if (leave) {
        deleteFile(key).then(res => {
          this.getFiles()
        })
      }
    },
    getFiles () {
      getFilesList().then(res => {
        this.fileList = res
      })
    },
    handleClick(){
      this.$refs.upload.post(this.file)
      // this.$router.push({
      //   name:'argu',
      //   params:{
      //     name:'xzzzz'
      //   }
      // })
    }
  },
  mounted(){
    this.getFiles()
   


  }
}
</script>
