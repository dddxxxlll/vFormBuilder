import Vue from 'vue'
import vformbuilder from '../packages/index'

let myPlugin = {
    version: '1.0.0',
    install: function(Vue) {
        if (this.installed) return;
        Vue.component(vformbuilder.name, vformbuilder)
    }
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
	myPlugin.install(window.Vue);
}

Vue.use(myPlugin)

export default myPlugin;