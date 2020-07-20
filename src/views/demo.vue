<template>
    <div class="Main">
        <div class="leftBox">
            <dl>
                <dt class="title">选择题</dt>
                <dd>
                    <el-button @click="addQuertion('Radio')">单选题</el-button>
                    <el-button @click="addQuertion('Checkbox')">多选题</el-button>
                    <el-button @click="addQuertion('Select')">下拉题</el-button>
                    <el-button @click="addQuertion('DatePicker')">日期</el-button>
                    <el-button @click="addQuertion('RadioTable')">矩阵选择</el-button>
                </dd>
            </dl>
            <dl>
                <dt class="title">填空题</dt>
                <dd>
                    <el-button @click="addQuertion('Input')">填空题</el-button>
                    <el-button @click="addQuertion('MultiInput')">多项填空</el-button>
                    <el-button @click="addQuertion('InputTable')">矩阵填空</el-button>
                </dd>
            </dl>
        </div>
        <div class="middleBox">
            <FormBuilder @switchQuestion="switchQuestion" @addOption="addOption" @delOption="delOption" @delQuestion="delQuestion" @selectQuestion="selectQuestion" :editMode="editMode" :formData="formData" class="formBuilder"></FormBuilder>
        </div>
        <div class="rightBox">
            <div class="title">
                {{selectedType==="question"?"题目设置":"选项设置"}}
            </div>
            <div class="content">
                <el-form v-if="selectedType==='question'" label-width="80px">
                    <el-form-item label="题目">
                        <el-input v-model="formData[selectedIndex].question"></el-input>
                    </el-form-item>
                    <el-form-item label="题目描述">
                        <el-input v-model="formData[selectedIndex].des" type="textarea" @change="changeDes"></el-input>
                    </el-form-item>
                    <el-form-item label="是否必填">
                        <el-switch v-model="formData[selectedIndex].queLimit.required"></el-switch>
                    </el-form-item>
                    <el-form-item label="题目分值">
                        <el-input v-model="formData[selectedIndex].queLimit.score"></el-input>
                    </el-form-item>
                    <el-form-item label="题目权重">
                        <el-input v-model="formData[selectedIndex].queLimit.weight"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="最多选中(%)" v-if="formData[selectedIndex].queType==='Checkbox'">
                        <el-input v-model="formData[selectedIndex].limit"></el-input>
                    </el-form-item> -->
                    <el-form-item label="单选/多选" v-if="formData[selectedIndex].queType==='RadioTable'">
                        <el-switch v-model="formData[selectedIndex].queLimit.selectType" active-text="单选" inactive-text="多选" active-value="Radio" inactive-value="CheckBox"></el-switch>
                    </el-form-item>
                    <el-form-item v-if="formData[selectedIndex[0]].queType==='Radio'||formData[selectedIndex[0]].queType==='Checkbox'" label="选项布局">
                        <el-radio-group class="clearfix" v-model="formData[selectedIndex].queLimit.arrange">
                            <el-radio style="float:left;line-height:40px;" :label="1" name="单列">单列</el-radio>
                            <el-radio style="float:left;line-height:40px;" :label="2" name="双列">双列</el-radio>
                            <el-radio style="float:left;line-height:40px;" :label="3" name="三列">三列</el-radio>
                            <el-radio style="float:left;line-height:40px;" :label="4" name="四列">四列</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <template v-if="formData[selectedIndex[0]].queType==='Input'">
                        <el-form-item label="最大字数">
                            <el-input v-model="formData[selectedIndex].queLimit.maxWr"></el-input>
                        </el-form-item>
                        <el-form-item label="最小字数">
                            <el-input    v-model="formData[selectedIndex].queLimit.minWr"></el-input>
                        </el-form-item>
                    </template>
                    <template v-if="formData[selectedIndex].queType==='Checkbox'">
                        <el-form-item label="最多选择">
                            <el-input v-model="formData[selectedIndex].queLimit.maxWr"></el-input>
                        </el-form-item>
                        <el-form-item label="最少选择">
                            <el-input    v-model="formData[selectedIndex].queLimit.minWr"></el-input>
                        </el-form-item>
                    </template>
                    <el-form-item v-if="formData[selectedIndex[0]].queType==='Input'" label="类型限制">
                        <el-select v-model="formData[selectedIndex[0]].queLimit.fillType">
                            <el-option
                                v-for="item in fillTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逻辑设置">
                        <el-button @click="openLogic">逻辑设置</el-button>
                    </el-form-item>
                    <el-form-item v-if="formData[selectedIndex[0]].queType==='RadioTable'||formData[selectedIndex[0]].queType==='InputTable'" label="选项设置">
                        <el-button @click="tableOption">选项设置</el-button>
                    </el-form-item>
                </el-form>
                <el-form v-if="selectedType==='option'" label-width="80px">
                    <el-form-item label="选项">
                        <el-input v-model="formData[selectedIndex[0]].options[selectedIndex[1]].des"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="选项的值">
                        <el-input v-model="formData[selectedIndex[0]].options[selectedIndex[1]].value"></el-input>
                    </el-form-item> -->
                    <el-form-item v-if="formData[selectedIndex[0]].queType==='Radio'||formData[selectedIndex[0]].queType==='Checkbox'" label="能否输入">
                        <el-switch v-model="formData[selectedIndex[0]].options[selectedIndex[1]].hasInput"></el-switch>
                    </el-form-item>
                    <el-form-item v-if="formData[selectedIndex[0]].queType==='MultiInput'" label="最大字数">
                        <el-input v-model="formData[selectedIndex[0]].options[selectedIndex[1]].maxWr"></el-input>
                    </el-form-item>
                    <el-form-item v-if="formData[selectedIndex[0]].queType==='MultiInput'" label="最小字数">
                        <el-input v-model="formData[selectedIndex[0]].options[selectedIndex[1]].minWr"></el-input>
                    </el-form-item>
                    <el-form-item v-if="formData[selectedIndex[0]].queType==='MultiInput'" label="类型限制">
                        <el-select v-model="formData[selectedIndex[0]].options[selectedIndex[1]].fillType">
                            <el-option
                                v-for="item in fillTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="save" @click="saveData">
                保存
            </div>
        </div>
        <el-dialog
            title="选项设置"
            :visible.sync="dialogVisible"
            width="30%">
            <!-- {{JSON.stringify(formData[selectedIndex[0]].queType)}}
            {{JSON.stringify(selectedIndex)}} -->
            <template v-if="dialogVisible">
                <el-form label-width="80px">
                    <el-form-item :key="index" v-for="(item,index) in formData[selectedIndex[0]].options.column" :label="'选项'+(index+1)">
                        <el-input class="widtn80" v-model="item.name"></el-input>
                        <el-button style="margin-left:5px;" type="danger" class="del" size="small" @click="delOption(selectedIndex[0],index,'column')" icon="el-icon-delete" circle ></el-button>
                    </el-form-item>
                    <el-form-item :key="index" v-for="(item,index) in formData[selectedIndex[0]].options.row" :label="'行'+(index+1)">
                        <el-input class="widtn80" v-model="item.name"></el-input>
                        <el-button style="margin-left:5px;" type="danger" class="del" size="small" @click="delOption(selectedIndex[0],index,'row')" icon="el-icon-delete" circle ></el-button>
                    </el-form-item>
                </el-form>
            </template>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="逻辑设置"
            :visible.sync="dialogVisible2"
            width="30%">
            <!-- {{JSON.stringify(formData[selectedIndex[0]].queType)}}
            {{JSON.stringify(selectedIndex)}} -->
            <template v-if="dialogVisible2">
                <el-form label-width="80px">
                    <el-form-item label="题目">
                        <el-select @change="logicQChange" v-model="formData[selectedIndex].isShow.queOnly" placeholder="请选择题目">
                            <el-option
                                v-for="(item,index) in formData"
                                :key="item.queOnly"
                                :label="item.question"
                                v-show="(item.queType==='Radio'||item.queType==='Checkbox'||item.queType==='Select')&&index<selectedIndex[0]"
                                :value="item.queOnly">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选项" v-if="logicSelected!=-1">
                        <el-select v-model="formData[logicSelected].isShow.value" placeholder="请选择选项">
                            <el-option
                                v-for="(item) in logicOptions"
                                :key="item.value"
                                :label="item.des"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="条件" v-if="logicSelected!=-1">
                        <el-switch v-model="formData[logicSelected].isShow.check" active-text="选中" inactive-text="不选中" :active-value="true" :inactive-value="false"></el-switch>
                    </el-form-item>
                </el-form>
            </template>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import FormBuilder from "../components/formBuilder"
export default {
    name: 'formBuilder',
    data() {
        return {
            // formData: [
            //     {
            //         queType: "Radio",
            //         question: "这是一个单选题",
            //         queOnly: 0,
            //         queSeq: 0,
            //         value: 0,
            //         inputValue: "",//填空的值
            //         des: "",// 描述
            //         queLimit: {
            //             required: false,//必选
            //             score: 0,// 分值
            //             weight: 0,// 权重
            //             arrange:1,// 选项排列
            //         },
            //         isShow: {
            //             queOnly: "",
            //             value: "",
            //             check: "",
            //         }, // 必要题目序号数组
            //         options: [
            //             {
            //                 des: "选项1",
            //                 hasInput: false,
            //                 value: 1
            //             },
            //             {
            //                 des: "选项2",
            //                 hasInput: true,
            //                 value: 2
            //             }
            //         ]
            //     },
            //     {
            //         queType: "Checkbox",
            //         question: "这是一个多选题",
            //         queOnly: 1,
            //         queSeq: 1,
            //         value: [],
            //         inputValue: [],
            //         des: "",
            //         queLimit: {
            //             required: false,//必选
            //             score: 0,// 分值
            //             weight: 0,// 权重
            //             arrange:1,// 选项排列
            //             minWr: "",
            //             maxWr: ""
            //         },
            //         isShow: {
            //             queOnly: "",
            //             value: "",
            //             check: "",
            //         }, // 必要题目序号数组
            //         options: [
            //             {
            //                 des: "选项1",
            //                 hasInput: false,
            //                 value: 1
            //             },
            //             {
            //                 des: "选项2",
            //                 hasInput: true,
            //                 value: 2
            //             }
            //         ]
            //     },
            //     {
            //         queType: "Select",
            //         question: "这是一个下拉选择",
            //         queOnly: 2,
            //         queSeq: 2,
            //         value: "",
            //         des: "",// 描述
            //         queLimit: {
            //             required: false,//必选
            //             score: 0,// 分值
            //             weight: 0,// 权重
            //             arrange:1,// 选项排列
            //         },
            //         isShow: {
            //             queOnly: "",
            //             value: "",
            //             check: "",
            //         }, // 必要题目序号数组
            //         options: [
            //             {
            //                 des: "选项1",
            //                 value: 1
            //             },
            //             {
            //                 des: "选项2",
            //                 value: 2
            //             }
            //         ]
            //     },
            //     {
            //         queType: "DatePicker",
            //         question: "这是一个日期选择",
            //         queOnly: 3,
            //         queSeq: 3,
            //         value: 0,
            //         des: "",// 描述
            //         queLimit: {
            //             required: false,//必选
            //             score: 0,// 分值
            //             weight: 0,// 权重
            //         },
            //         isShow: {
            //             queOnly: 1,
            //             value: 1,
            //             check: false,
            //         }, // 必要题目序号数组
            //     },
            //     {
            //         queType: "RadioTable",
            //         question: "这是一个矩阵选择",
            //         queOnly: 4,
            //         queSeq: 4,
            //         des: "",// 描述
            //         queLimit: {
            //             required: false,//必选
            //             score: 0,// 分值
            //             weight: 0,// 权重
            //             selectType: "Radio",
            //             minWr: "",
            //             maxWr: ""
            //         },
            //         isShow: {
            //             queOnly: "",
            //             value: "",
            //             check: "",
            //         }, // 必要题目序号数组
            //         // value: 0,
            //         options: {
            //             column: [{name:"选项1",value:1},{name:"选项2",value:2}],
            //             row: [{name:"行1",value:[]},{name:"行2",value:[]}],
            //         }
            //     },
            //     {
            //         queType: "Input",
            //         question: "这是一个填空题",
            //         queOnly: 5,
            //         queSeq: 5,
            //         value: "",
            //         des: "",
            //         queLimit: {
            //             required: false,//必选
            //             score: 0,// 分值
            //             weight: 0,// 权重
            //             fillType: "Number",
            //             minWr: 0,
            //             maxWr: 10
            //         },
            //         isShow: {
            //             queOnly: "",
            //             value: "",
            //             check: "",
            //         }, // 必要题目序号数组
            //     },
            //     {
            //         queType: "MultiInput",
            //         question: "这是一个多项选择题",
            //         queOnly: 6,
            //         queSeq: 6,
            //         value: "",
            //         des: "",
            //         queLimit: {
            //             required: false,//必选
            //             score: 0,// 分值
            //             weight: 0,// 权重
            //         },
            //         isShow: {
            //             queOnly: "",
            //             value: "",
            //             check: "",
            //         }, // 必要题目序号数组
            //         options: [
            //             {
            //                 des: "填空1",
            //                 value: "",
            //                 fillType: "Number", // 输入框type：Number,ZH,EN,None
            //                 minWr: "",
            //                 maxWr: ""
            //             },
            //             {
            //                 des: "填空2",
            //                 value: "",
            //                 fillType: "None", // 输入框type：Number,ZH,EN,None
            //                 minWr: "",
            //                 maxWr: ""
            //             }
            //         ]
            //     },
            //     {
            //         queType: "InputTable",
            //         question: "这是一个矩阵填空",
            //         queOnly: 7,
            //         queSeq: 7,
            //         des: "",// 描述
            //         queLimit: {
            //             required: false,//必选
            //             score: 0,// 分值
            //             weight: 0,// 权重
            //         },
            //         isShow: {
            //             queOnly: "",
            //             value: "",
            //             check: true,
            //         }, // 必要题目序号数组
            //         options: {
            //             column: [{name:"选项1",value:1},{name:"选项2",value:2}],
            //             row: [{name:"行1",value:[]},{name:"行2",value:[]}],//值为数组，有多少列就有多少个值
            //         }
            //     }
            // ],
            formData: [],
            editMode: true,
            selectedType: "",
            selectedIndex: [],
            fillTypeOptions: [{
                value: 'None',
                label: '无限制'
            }, {
                value: 'Number',
                label: '数字'
            }, {
                value: 'ZH',
                label: '中文'
            }, {
                value: 'EN',
                label: '英文'
            }],
            dialogVisible: false,
            dialogVisible2: false,
            logicOptions: [],
            logicSelected: -1,
        }
    },
    computed: {
        Height() {
            return window.innerHeight-84;
        }
    },
    methods: {
        selectQuestion(type,index) {
            if(index === null){
                this.selectedType = null;
                this.selectedIndex = [null];
                console.log(this.selectType);
            }
            this.selectedType = type;
            if(type==="question") {
                this.selectedIndex = [index];
            } else if (type==="option") {
                this.selectedIndex = [...index];
            }
        },
        changeDes(v){
            console.log(JSON.stringify(v))
            this.formData[this.selectedIndex[0]].des = JSON.parse(JSON.stringify(v).replace(/\\n/gm,"<br/>"));
            console.log(this.formData[this.selectedIndex[0]].des)
        },
        generateUUID() {
            var d = new Date().getTime();
            if (window.performance && typeof window.performance.now === "function") {
                d += performance.now(); //use high-precision timer if available
            }
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        },
        addQuertion(type) {
            var data = {};
            if(type==="Radio") {
                data = {
                    queType: "Radio",
                    question: "这是一个单选题",
                    queOnly: this.generateUUID(),
                    queSeq: this.formData.length,
                    value: "",
                    inputValue: [],
                    des: "",// 描述
                    queLimit: {
                        required: false,//必选
                        score: 0,// 分值
                        weight: 0,// 权重
                        arrange:1,// 选项排列
                    },
                    isShow: {
                        queOnly: "",
                        value: "",
                        check: true,
                    }, // 必要题目序号数组
                    options: [
                        {
                            des: "选项1",
                            hasInput: false,
                            value: 1
                        },
                        {
                            des: "选项2",
                            hasInput: false,
                            value: 2
                        }
                    ]
                }
            } else if(type==="Checkbox") {
                data = {
                    queType: "Checkbox",
                    question: "这是一个多选题",
                    queOnly: this.generateUUID(),
                    queSeq: this.formData.length,
                    value: [],
                    inputValue: [],
                    des: "",
                    queLimit: {
                        required: false,//必选
                        score: 0,// 分值
                        weight: 0,// 权重
                        arrange:1,// 选项排列
                        minWr: "",
                        maxWr: ""
                    },
                    isShow: {
                        queOnly: "",
                        value: "",
                        check: true,
                    }, // 必要题目序号数组
                    options: [
                        {
                            des: "选项1",
                            hasInput: false,
                            value: 1
                        },
                        {
                            des: "选项2",
                            hasInput: false,
                            value: 2
                        }
                    ]
                }
            } else if(type==="Select") {
                data = {
                    queType: "Select",
                    question: "这是一个下拉选择",
                    queOnly: this.generateUUID(),
                    queSeq: this.formData.length,
                    value: "",
                    des: "",// 描述
                    queLimit: {
                        required: false,//必选
                        score: 0,// 分值
                        weight: 0,// 权重
                        arrange:1,// 选项排列
                    },
                    isShow: {
                        queOnly: "",
                        value: "",
                        check: true,
                    }, // 必要题目序号数组
                    options: [
                        {
                            des: "选项1",
                            value: 1
                        },
                        {
                            des: "选项2",
                            value: 2
                        }
                    ]
                }
            } else if(type==="DatePicker") {
                data = {
                    queType: "DatePicker",
                    question: "这是一个日期选择",
                    queOnly: this.generateUUID(),
                    queSeq: this.formData.length,
                    value: "",
                    des: "",// 描述
                    queLimit: {
                        required: false,//必选
                        score: 0,// 分值
                        weight: 0,// 权重
                    },
                    isShow: {
                        queOnly: "",
                        value: "",
                        check: true,
                    }, // 必要题目序号数组
                }
            } else if(type==="RadioTable") {
                data = {
                    queType: "RadioTable",
                    question: "这是一个矩阵选择",
                    queOnly: this.generateUUID(),
                    queSeq: this.formData.length,
                    des: "",// 描述
                    queLimit: {
                        required: false,//必选
                        score: 0,// 分值
                        weight: 0,// 权重
                        selectType: "Radio",
                        minWr: "",
                        maxWr: ""
                    },
                    isShow: {
                        queOnly: "",
                        value: "",
                        check: true,
                    }, // 必要题目序号数组
                    // value: 0,
                    options: {
                        column: [{name:"选项1",value:1},{name:"选项2",value:2}],
                        row: [{name:"行1",value:[]},{name:"行2",value:[]}],
                    }
                }
            } else if(type==="Input") {
                data = {
                    queType: "Input",
                    question: "这是一个填空题",
                    queOnly: this.generateUUID(),
                    queSeq: this.formData.length,
                    value: "",
                    des: "",
                    queLimit: {
                        required: false,//必选
                        score: 0,// 分值
                        weight: 0,// 权重
                        fillType: "None",
                        minWr: "",
                        maxWr: ""
                    },
                    isShow: {
                        queOnly: "",
                        value: "",
                        check: true,
                    }, // 必要题目序号数组
                }
            } else if(type==="MultiInput") {
                data = {
                    queType: "MultiInput",
                    question: "这是一个多项选择题",
                    queOnly: this.generateUUID(),
                    queSeq: this.formData.length,
                    value: "",
                    des: "",
                    queLimit: {
                        required: false,//必选
                        score: 0,// 分值
                        weight: 0,// 权重
                    },
                    isShow: {
                        queOnly: "",
                        value: "",
                        check: true,
                    }, // 必要题目序号数组
                    options: [
                        {
                            des: "填空1",
                            value: "",
                            fillType: "None", // 输入框type：Number,ZH,EN,None
                            minWr: "",
                            maxWr: ""
                        },
                        {
                            des: "填空2",
                            value: "",
                            fillType: "None", // 输入框type：Number,ZH,EN,None
                            minWr: "",
                            maxWr: ""
                        }
                    ]
                }
            } else if(type==="InputTable") {
                data = {
                    queType: "InputTable",
                    question: "这是一个矩阵填空",
                    queOnly: this.generateUUID(),
                    queSeq: this.formData.length,
                    des: "",// 描述
                    queLimit: {
                        required: false,//必选
                        score: 0,// 分值
                        weight: 0,// 权重
                    },
                    isShow: {
                        queOnly: "",
                        value: "",
                        check: true,
                    }, // 必要题目序号数组
                    options: {
                        column: [{name:"选项1",value:1},{name:"选项2",value:2}],
                        row: [{name:"行1",value:[]},{name:"行2",value:[]}],//值为数组，有多少列就有多少个值
                    }
                }
            }

            this.formData.push(data);
        },
        switchQuestion(type,index) {
            this.selectQuestion("question",null)
            if(type==="up") {
                [this.formData[index-1],this.formData[index]] = [this.formData[index],this.formData[index-1]];
            } else if(type==="down") {
                [this.formData[index],this.formData[index+1]] = [this.formData[index+1],this.formData[index]];
            }
            for(let i=0;i<this.formData.length;i++){
                this.formData[i].queSeq = i;
            }
        },
        delQuestion(index) {
            this.$confirm('是否删除该题?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.formData.splice(index,1);
                for(let i=0;i<this.formData.length;i++){
                    this.formData[i].queSeq = i;
                }
                this.selectQuestion("question",null)
                console.log(this.selectedIndex)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        addOption(index,roc) {
            const type = this.formData[index].queType;
            const options = this.formData[index].options
            if(type==="Radio"||type==="Checkbox") {
                let max = 0;
                for(let i=0;i<options.length;i++){
                    if(options[i].value>=max){
                        max = options[i].value+1;
                    }
                }
                let data = {
                    des: "选项"+max,
                    hasInput: false,
                    value: max
                }
                this.formData[index].options.push(data);
            } else if(type==="Select") {
                let max = 0;
                for(let i=0;i<options.length;i++){
                    if(options[i].value>=max){
                        max = options[i].value+1;
                    }
                }
                let data = {
                    des: "选项"+max,
                    value: max
                }
                this.formData[index].options.push(data);
            } else if(type==="RadioTable") {
                if(roc&&roc==="row"){
                    let data = {
                        name: "新的行",
                        value: []
                    }
                    this.formData[index].options.row.push(data);
                } else if(roc&&roc==="column"){
                    let max = 0;
                    for(let i=0;i<options.column.length;i++){
                        if(options.column[i].value>=max){
                            max = options.column[i].value+1;
                        }
                    }
                    let data = {
                        name: "选项"+max,
                        value: max
                    }
                    this.formData[index].options.column.push(data);
                }
            } else if(type==="MultiInput") {
                let data = {
                    des: "新填空",
                    value: "",
                    fillType: "None",
                    minWr: "",
                    maxWr: ""
                }
                this.formData[index].options.push(data);
            } else if(type==="InputTable") {
                if(roc&&roc==="row"){
                    let data = {
                        name: "新的行",
                        value: []
                    }
                    this.formData[index].options.row.push(data);
                } else if(roc&&roc==="column"){
                    let max = 0;
                    for(let i=0;i<options.column.length;i++){
                        if(options.column[i].value>=max){
                            max = options.column[i].value+1;
                        }
                    }
                    let data = {
                        name: "选项"+max,
                        value: max
                    }
                    this.formData[index].options.column.push(data);
                }
            }
        },
        delOption(index,oIndex,ifMatrix) {
            if(ifMatrix) {
                this.formData[index].options[ifMatrix].splice(oIndex,1);
            } else {
                this.formData[index].options.splice(oIndex,1);
            }
        },
        tableOption() {
            this.dialogVisible = true;
        },
        openLogic() {
            if(this.formData[this.selectedIndex[0]].isShow.queOnly){
                let v = this.formData[this.selectedIndex[0]].isShow.queOnly;
                for(let i=0;i<this.formData.length;i++){
                    if(this.formData[i].queOnly===v){
                        this.logicOptions = this.formData[i].options;
                        this.logicSelected = i;
                    }
                }
            } else {
                this.logicOptions = [];
                this.logicSelected = -1;
            }
            this.dialogVisible2 = true;
        },
        logicQChange(v) {
            for(let i=0;i<this.formData.length;i++){
                if(this.formData[i].queOnly===v){
                    this.logicOptions = this.formData[i].options;
                    this.logicSelected = i;
                    //this.formData[i].isShow.queOnly = v;
                }
            }
        },
        saveData() {
            console.log("保存数据:",this.formData);
        }
    },
    components: {
        FormBuilder
    }
}
</script>

<style scoped lang="scss">
.Main {
    width:100%;
    height: 100%;
    display: flex;
    .widtn80 {
        width: 80%;
    }
    .leftBox {
        width: 233px;
        height: 100%;
        padding: 24px 12px;
        box-sizing: border-box;
        background-color: #fafafa;
        border-right: 1px solid #dde5ed;
        flex-shrink: 0;
        .title {
            width: 100%;
            color: #4a4a4a;
            font-size: 14px;
            font-weight: 400;
            line-height: 21px;
            height: 21px;
            text-align: left;
        }
        dd {
            margin: 0;
            /deep/ .el-button {
                width: 100%;
                margin: 6px 0;
            }
        }
    }
    .middleBox {
        flex-grow: 1;
        overflow: auto;
        background: rgba(128,133,144,.15);
        .formBuilder {
            margin: 0 auto;
        }
    }
    .rightBox {
        width: 260px;
        height: 100%;
        flex-shrink: 0;
        padding: 5px;
        box-sizing: border-box;
        position: relative;
        .title {
            width: 100%;
            height: 60px;
            line-height: 60px;
            font-size: 22px;
            border-bottom: 1px solid gray;
            margin-bottom: 20px;
        }
        .save {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50px;
            line-height: 50px;
            background-color: #42b983;
            color: #FFF;
            text-align: center;
            font-size: 22px;
            cursor: pointer;
        }
    }
}
</style>
