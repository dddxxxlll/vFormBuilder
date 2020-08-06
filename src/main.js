import Vue from 'vue'
import App from './App.vue'
import { Button, Select, Option, Radio, RadioGroup, Input, Checkbox, CheckboxGroup, DatePicker, Table, TableColumn, Form, FormItem, Switch, MessageBox, Message, Dialog } from 'element-ui';
require("./assets/reset.css")
import vformbuilder from 'vformbuilder-dddxxxlll'
require('../node_modules/vformbuilder-dddxxxlll/lib/vformbuilder.css')

Vue.use(vformbuilder)

Vue.use(Button)
Vue.use(Select)
Vue.use(Radio)
Vue.use(RadioGroup);
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(DatePicker)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Switch)
Vue.use(Option);
Vue.use(Dialog);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
