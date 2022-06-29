import Vue from 'vue'
import { Button } from 'element-ui'
import {Form
    ,FormItem
    ,Container
    ,Header
    ,Aside
    ,Main
    ,Menu
    ,Submenu
    ,MenuItemGroup
    ,MenuItem
    ,Breadcrumb
    ,BreadcrumbItem
    ,Card
    ,Row
    ,Col
    ,Table
    ,TableColumn
    ,Switch
    ,Tooltip
    ,Pagination
    ,Dialog
    ,MessageBox
    ,Tag
    ,Tree
    ,Alert
    ,Steps
    ,Step
    ,Tabs
    ,TabPane
    ,Upload
    ,Image
    ,DatePicker
    ,Select
    ,Option
} from 'element-ui'
import {Input}  from 'element-ui'
//导入消息提示
import { Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Upload)
Vue.use(Image)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)

//挂载消息
Vue.prototype.$message = Message

Vue.prototype.$confirm = MessageBox.confirm

Vue.prototype.$alert = MessageBox.alert

Vue.prototype.$prompt = MessageBox.prompt