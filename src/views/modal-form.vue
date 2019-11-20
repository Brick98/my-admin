<template>
  <div>
    <Button @click="modal8 = true">Disable mask layer closure</Button>
    <Modal v-model="modal8" @on-cancel="cancel" width="500">
        <p slot="header" style="text-align:center">
            <!-- <Icon type="ios-information-circle"></Icon> -->
            <span>Delete confirmation</span>
        </p>
        <div style="text-align:center">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="Name" prop="name">
                  <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
              </FormItem>
              <FormItem label="E-mail" prop="mail">
                  <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
              <FormItem label="City" prop="city">
                  <Select v-model="formValidate.city" placeholder="Select your city">
                      <Option value="beijing">New York</Option>
                      <Option value="shanghai">London</Option>
                      <Option value="shenzhen">Sydney</Option>
                  </Select>
              </FormItem>
              
              <FormItem>
                  <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                  <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
              </FormItem>
          </Form>
        </div>
        <div slot="footer">
            <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
        </div>
    </Modal>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                modal8: false,
                list:[
        {
            "id": 1,
            "menuName": "创世纪蒲公英在线教育",
            "url": "\"\"",
            "menuType": 1,
            "target": 1,
            "sort": 0,
            "menuIcon": "\"\"",
            "menuDescription": "\"\"",
            "parentId": 0,
            "isUser": 0,
            "children": [
                {
                    "id": 2,
                    "menuName": "权限管理",
                    "url": "\"\"",
                    "menuType": 1,
                    "target": 1,
                    "sort": 0,
                    "menuIcon": "\"\"",
                    "menuDescription": "\"\"",
                    "parentId": 1,
                    "isUser": 0,
                    "children": [
                        {
                            "id": 3,
                            "menuName": "菜单管理",
                            "url": "\"\"",
                            "menuType": 1,
                            "target": 1,
                            "sort": 0,
                            "menuIcon": "\"\"",
                            "menuDescription": "\"\"",
                            "parentId": 2,
                            "isUser": 0,
                            "children": []
                        },
                        {
                            "id": 4,
                            "menuName": "角色管理",
                            "url": "\"\"",
                            "menuType": 1,
                            "target": 1,
                            "sort": 0,
                            "menuIcon": "\"\"",
                            "menuDescription": "\"\"",
                            "parentId": 2,
                            "isUser": 0,
                            "children": []
                        },
                        {
                            "id": 5,
                            "menuName": "授权",
                            "url": "\"\"",
                            "menuType": 1,
                            "target": 1,
                            "sort": 0,
                            "menuIcon": "\"\"",
                            "menuDescription": "\"\"",
                            "parentId": 2,
                            "isUser": 0,
                            "children": []
                        }
                    ]
                }
            ]
        }
    ],
                formValidate: {
                    name: '',
                    mail: '',
                    city: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            deleteItem (item,data){
              if(item.children){
                 return item.children.filter(element=>{
                    if(element.id != data.id){
                      element.children = this.deleteItem(element,data)
                      return true
                    }else{
                      return false
                    }
                  })
                }else {
                  return item
                }
            },
            handleSubmit (name) {
              let list = this.deleteItem(this.list[0],{id:'3'})
              console.log(list)
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            cancel () {
                this.$Message.info('Clicked cancel');
                this.handleReset('formValidate')
            }
        }
    }
</script>
