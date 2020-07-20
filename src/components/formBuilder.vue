<template>
    <div class="formBuilder" @click="selectQuestion(null)">
        <div class="contentBox" v-if="editMode">
            <template v-for="(question,index) in formData">
                <!-- 单选，多选，下拉选择 -->
                <div class="questionBox Fselect" :class="{selected: questionSelect==index}" @click.stop="selectQuestion(index)" v-if="checkType(question.queType)" :key="question.queOnly">
                    <div class="order">
                        {{index+1}}
                    </div>
                    <dl class="wrapper">
                        <dt>
                            {{question.question}}
                            <div class="iconBox">
                                <i class="el-icon-arrow-up icon" v-show="index!=0&&formData.length>1" @click.stop="switchQuestion('up',index)"></i>
                                <i class="el-icon-arrow-down icon" v-show="index!=formData.length-1&&formData.length>1" @click.stop="switchQuestion('down',index)"></i>
                                <i class="el-icon-delete icon" @click.stop="delQuestion(index)"></i>
                                <span class="ifLogic" v-show="question.isShow.queOnly">已有逻辑</span>
                            </div>
                        </dt>
                        <dd v-if="question.des" v-html="question.des"></dd>
                        <dd :class="{selected: index===optionSelection[0]&&oIndex===optionSelection[1],column_2:question.queLimit.arrange===2,column_3:question.queLimit.arrange===3,column_4:question.queLimit.arrange===4}" class="clearfix column" v-for="(option,oIndex) in question.options" :key="option.value" @click.stop="selectOption(index,oIndex)">
                            <!-- 选项前的图标差分 -->
                            <el-radio v-if="question.queType==='Radio'" :label="option.value">{{option.des}}</el-radio>
                            <el-checkbox style="margin-right:30px;" v-if="question.queType==='Checkbox'" :label="option.value">{{option.des}}</el-checkbox>
                            <div class="selectBox"  v-if="question.queType==='Select'">
                                <i class="el-icon-caret-bottom" style="margin-right:10px;"></i>
                                <span>{{option.des}}</span>
                            </div>
                            <!-- ------ -->
                            <el-input class="input" size="small" v-if="option.hasInput&&question.queType!='Select'"></el-input>
                            <el-button type="danger" class="del" size="small" @click="delOption(index,oIndex)" icon="el-icon-delete" circle v-show="questionSelect==index"></el-button>
                        </dd>
                        <dd class="editBox" v-show="questionSelect==index">
                            <el-button class="btn" icon="el-icon-plus" size="small" @click="addOption(index)">新增选项</el-button>
                        </dd>
                    </dl>
                </div>
                <!-- 日期选择 -->
                <div class="questionBox" :class="{selected: questionSelect==index}" @click.stop="selectQuestion(index)" v-if="question.queType==='DatePicker'" :key="question.queOnly">
                    <div class="order">
                        {{index+1}}
                    </div>
                    <dl class="wrapper">
                        <dt>
                            {{question.question}}
                            <div class="iconBox">
                                <i class="el-icon-arrow-up icon" v-show="index!=0&&formData.length>1" @click.stop="switchQuestion('up',index)"></i>
                                <i class="el-icon-arrow-down icon" v-show="index!=formData.length-1&&formData.length>1" @click.stop="switchQuestion('down',index)"></i>
                                <i class="el-icon-delete icon" @click.stop="delQuestion(index)"></i>
                            </div>
                        </dt>
                        <dd class="clearfix">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </dd>
                    </dl>
                </div>
                <!-- 矩阵选择 -->
                <div class="questionBox" :class="{selected: questionSelect==index}" @click.stop="selectQuestion(index)" v-if="question.queType==='RadioTable'" :key="question.queOnly">
                    <div class="order">
                        {{index+1}}
                    </div>
                    <dl class="wrapper">
                        <dt>
                            {{question.question}}
                            <div class="iconBox">
                                <i class="el-icon-arrow-up icon" v-show="index!=0&&formData.length>1" @click.stop="switchQuestion('up',index)"></i>
                                <i class="el-icon-arrow-down icon" v-show="index!=formData.length-1&&formData.length>1" @click.stop="switchQuestion('down',index)"></i>
                                <i class="el-icon-delete icon" @click.stop="delQuestion(index)"></i>
                            </div>
                        </dt>
                        <dd class="clearfix" style="width:auto;">
                            <el-table
                                :data="question.options.row"
                                border
                                style="width: auto;display:inline-block;">
                                <el-table-column
                                    prop="name"
                                    label="">
                                </el-table-column>
                                <el-table-column
                                    v-for="(column,indexcolumn) in question.options.column"
                                    :key="indexcolumn"
                                    :label="column.name"
                                    width="100"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-radio v-if="question.queLimit.selectType==='Radio'" :label="indexcolumn" v-model="scope.row.value">{{""}}</el-radio>
                                        <el-checkbox v-if="question.queLimit.selectType==='CheckBox'" v-model="scope.row.value[indexcolumn]">{{""}}</el-checkbox>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </dd>
                        <dd class="editBox" v-show="questionSelect==index">
                            <el-button class="btn" icon="el-icon-plus" size="small" @click="addOption(index,'row')">新增行</el-button>
                            <el-button class="btn" icon="el-icon-plus" size="small" @click="addOption(index,'column')">新增列</el-button>
                        </dd>
                    </dl>
                </div>
                <!-- 填空题 -->
                <div class="questionBox" :class="{selected: questionSelect==index}" @click.stop="selectQuestion(index)" v-if="question.queType==='Input'" :key="question.queOnly">
                    <div class="order">
                        {{index+1}}
                    </div>
                    <dl class="wrapper">
                        <dt>
                            {{question.question}}
                            <div class="iconBox">
                                <i class="el-icon-arrow-up icon" v-show="index!=0&&formData.length>1" @click.stop="switchQuestion('up',index)"></i>
                                <i class="el-icon-arrow-down icon" v-show="index!=formData.length-1&&formData.length>1" @click.stop="switchQuestion('down',index)"></i>
                                <i class="el-icon-delete icon" @click.stop="delQuestion(index)"></i>
                            </div>
                        </dt>
                        <dd class="clearfix">
                            <el-input v-model="question.value"></el-input>
                        </dd>
                    </dl>
                </div>
                <!-- 多项填空 -->
                <div class="questionBox" :class="{selected: questionSelect==index}" @click.stop="selectQuestion(index)" v-if="question.queType==='MultiInput'" :key="question.queOnly">
                    <div class="order">
                        {{index+1}}
                    </div>
                    <dl class="wrapper">
                        <dt>
                            {{question.question}}
                            <div class="iconBox">
                                <i class="el-icon-arrow-up icon" v-show="index!=0&&formData.length>1" @click.stop="switchQuestion('up',index)"></i>
                                <i class="el-icon-arrow-down icon" v-show="index!=formData.length-1&&formData.length>1" @click.stop="switchQuestion('down',index)"></i>
                                <i class="el-icon-delete icon" @click.stop="delQuestion(index)"></i>
                            </div>
                        </dt>
                        <dd :class="{selected: index===optionSelection[0]&&oIndex===optionSelection[1]}" class="clearfix" v-for="(option,oIndex) in question.options" :key="option.value" @click.stop="selectOption(index,oIndex)">
                            <div class="inputDes">
                                {{option.des}}
                                <el-button type="danger" class="del" size="small" @click="delOption(index,oIndex)" icon="el-icon-delete" circle v-show="questionSelect==index"></el-button>
                            </div>
                            <el-input v-model="option.value"></el-input>
                        </dd>
                        <dd class="editBox" v-show="questionSelect==index">
                            <el-button class="btn" icon="el-icon-plus" size="small" @click="addOption(index)">新增选项</el-button>
                        </dd>
                    </dl>
                </div>
                <!-- 矩阵选择 -->
                <div class="questionBox" :class="{selected: questionSelect==index}" @click.stop="selectQuestion(index)" v-if="question.queType==='InputTable'" :key="question.queOnly">
                    <div class="order">
                        {{index+1}}
                    </div>
                    <dl class="wrapper">
                        <dt>
                            {{question.question}}
                            <div class="iconBox">
                                <i class="el-icon-arrow-up icon" v-show="index!=0&&formData.length>1" @click.stop="switchQuestion('up',index)"></i>
                                <i class="el-icon-arrow-down icon" v-show="index!=formData.length-1&&formData.length>1" @click.stop="switchQuestion('down',index)"></i>
                                <i class="el-icon-delete icon" @click.stop="delQuestion(index)"></i>
                            </div>
                        </dt>
                        <dd class="clearfix" style="width:auto;">
                            <el-table
                                :data="question.options.row"
                                border
                                style="width: auto;display:inline-block;">
                                <el-table-column
                                    prop="name"
                                    label="">
                                </el-table-column>
                                <el-table-column
                                    v-for="(column,indexcolumn) in question.options.column"
                                    :key="indexcolumn"
                                    :label="column.name"
                                    width="100"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.value[indexcolumn]"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </dd>
                        <dd class="editBox" v-show="questionSelect==index">
                            <el-button class="btn" icon="el-icon-plus" size="small" @click="addOption(index,'row')">新增行</el-button>
                            <el-button class="btn" icon="el-icon-plus" size="small" @click="addOption(index,'column')">新增列</el-button>
                        </dd>
                    </dl>
                </div>
            </template>
        </div>
        <div class="contentBox" v-if="!editMode">
            {{JSON.stringify(formData)}}
            <template v-for="(question,index) in formData">
                <!-- 单选，多选，下拉选择 -->
                <div class="questionBox Fselect" v-if="checkType(question.queType)" v-show="ifShow(question.isShow,index)" :key="question.queOnly">
                    <div class="order">
                        {{index+1}}
                    </div>
                    <dl class="wrapper">
                        <dt>
                            {{question.question}}
                        </dt>
                        <dd v-if="question.des" v-html="question.des"></dd>
                        <el-radio-group v-if="question.queType==='Radio'" v-model="question.value">
                            <dd :class="{column_2:question.queLimit.arrange===2,column_3:question.queLimit.arrange===3,column_4:question.queLimit.arrange===4}" class="clearfix column" v-for="(option,oIndex) in question.options" :key="option.value">
                                <el-radio :label="option.value">{{option.des}}</el-radio>
                                <el-input class="input" size="small" v-if="option.hasInput" v-model="question.inputValue[oIndex]"></el-input>
                            </dd>
                        </el-radio-group>
                        <el-checkbox-group v-if="question.queType==='Checkbox'" v-model="question.value">
                            <dd :class="{column_2:question.queLimit.arrange===2,column_3:question.queLimit.arrange===3,column_4:question.queLimit.arrange===4}" class="clearfix column" v-for="(option,oIndex) in question.options" :key="option.value">
                                <el-checkbox style="margin-right:30px;" :label="option.value">{{option.des}}</el-checkbox>
                                <el-input class="input" size="small" v-if="option.hasInput" v-model="question.inputValue[oIndex]"></el-input>
                            </dd>
                        </el-checkbox-group>
                        <template v-if="question.queType==='Select'">
                            <el-select v-model="question.value">
                                <el-option
                                    v-for="(option) in question.options"
                                    :key="option.value"
                                    :label="option.des"
                                    :value="option.value">
                                </el-option>
                            </el-select>
                        </template>
                    </dl>
                </div>
                <!-- 日期选择 -->
                <div class="questionBox" v-show="ifShow(question.isShow,index)" v-if="question.queType==='DatePicker'" :key="question.queOnly">
                    <div class="order">
                        {{index+1}}
                    </div>
                    <dl class="wrapper">
                        <dt>
                            {{question.question}}
                        </dt>
                        <dd class="clearfix">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="question.value">
                            </el-date-picker>
                        </dd>
                    </dl>
                </div>
                <!-- 矩阵选择 -->
                <div class="questionBox" v-show="ifShow(question.isShow,index)" v-if="question.queType==='RadioTable'" :key="question.queOnly">
                    <div class="order">
                        {{index+1}}
                    </div>
                    <dl class="wrapper">
                        <dt>
                            {{question.question}}
                        </dt>
                        <dd class="clearfix" style="width:auto;">
                            <el-table
                                :data="question.options.row"
                                border
                                style="width: auto;display:inline-block;">
                                <el-table-column
                                    prop="name"
                                    label="">
                                </el-table-column>
                                <el-table-column
                                    v-for="(column,indexcolumn) in question.options.column"
                                    :key="indexcolumn"
                                    :label="column.name"
                                    width="100"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-radio v-if="question.queLimit.selectType==='Radio'" :label="indexcolumn" v-model="scope.row.value">{{""}}</el-radio>
                                        <el-checkbox v-if="question.queLimit.selectType==='CheckBox'" v-model="scope.row.value[indexcolumn]">{{""}}</el-checkbox>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </dd>
                    </dl>
                </div>
                <!-- 填空题 -->
                <div class="questionBox" v-show="ifShow(question.isShow,index)" v-if="question.queType==='Input'" :key="question.queOnly">
                    <div class="order">
                        {{index+1}}
                    </div>
                    <dl class="wrapper">
                        <dt>
                            {{question.question}}
                        </dt>
                        <dd class="clearfix">
                            <el-input v-model="question.value" :maxlength="question.queLimit.maxWr" :minlength="question.queLimit.minWr" @input="value=>{checkCheckbox(value,question.queLimit.fillType,index)}"></el-input>
                        </dd>
                    </dl>
                </div>
                <!-- 多项填空 -->
                <div class="questionBox" v-show="ifShow(question.isShow,index)" v-if="question.queType==='MultiInput'" :key="question.queOnly">
                    <div class="order">
                        {{index+1}}
                    </div>
                    <dl class="wrapper">
                        <dt>
                            {{question.question}}
                        </dt>
                        <dd class="clearfix" v-for="(option,oIndex) in question.options" :key="oIndex">
                            <div class="inputDes">
                                {{option.des}}
                            </div>
                            <el-input v-model="option.value" :maxlength="option.maxWr" :minlength="option.minWr" @input="value=>{checkCheckbox(value,option.fillType,[index,oIndex])}"></el-input>
                        </dd>
                    </dl>
                </div>
                <!-- 矩阵选择 -->
                <div class="questionBox" v-show="ifShow(question.isShow,index)" v-if="question.queType==='InputTable'" :key="question.queOnly">
                    <div class="order">
                        {{index+1}}
                    </div>
                    <dl class="wrapper">
                        <dt>
                            {{question.question}}
                        </dt>
                        <dd class="clearfix" style="width:auto;">
                            <el-table
                                :data="question.options.row"
                                border
                                style="width: auto;display:inline-block;">
                                <el-table-column
                                    prop="name"
                                    label="">
                                </el-table-column>
                                <el-table-column
                                    v-for="(column,indexcolumn) in question.options.column"
                                    :key="indexcolumn"
                                    :label="column.name"
                                    width="100"
                                    align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.value[indexcolumn]"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </dd>
                    </dl>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FormBuilder',
    props: {
        formData: {
            type: Array,
            default: () => {
                return [];
            }
        },
        editMode: {
            type: Boolean,
            default: () => {
                return false;
            }
        }
    },
    data() {
        return {
            questionSelect: null,
            optionSelection: new Array(2),
        }
    },
    methods: {
        selectQuestion(index) {
            this.questionSelect = index;
            this.optionSelection = new Array(2);
            this.$emit("selectQuestion","question",index);
        },
        selectOption(index,oIndex) {
            this.optionSelection = [index, oIndex];
            this.$emit("selectQuestion","option",this.optionSelection);
        },
        checkType(type) {
            if(type==='Radio'||type==='Checkbox'||type==="Select"){
                return true;
            } else {
                return false;
            }
        },
        switchQuestion(type,index) {
            this.questionSelect = null;
            this.optionSelection = new Array(2);
            this.$emit("switchQuestion",type,index)
        },
        delQuestion(index) {
            this.questionSelect = null;
            this.optionSelection = new Array(2);
            //this.selectQuestion(null);
            this.$emit("delQuestion",index)
        },
        addOption(index,roc) {
            this.$emit("addOption",index,roc)
        },
        delOption(index,oIndex) {
            this.$emit("delOption",index,oIndex)
        },
        ifShow(ifShow,index) {
            for(let i=0;i<index;i++){
                if(ifShow.queOnly===this.formData[i].queOnly){
                    let checkvalue = false;
                    if(this.formData[i].queType==="Checkbox"){
                        this.formData[i].value.map(function(v){
                            if(v===ifShow.value){
                                checkvalue = true;
                            }
                        })
                    } else {
                        if(this.formData[i].value===ifShow.value){
                            checkvalue;
                        }
                    }
                    if(ifShow.check&&checkvalue) {
                        return true;
                    }
                    if(!ifShow.check&&!checkvalue){
                        return true;
                    }
                    return false;
                }
            }
            return true;
        },
        checkCheckbox(value,type,index) {
            if(type==="Number") {
                value=value.replace(/[^\d.]/g,'')
            } else if(type==="ZH"){
                value=value.replace(/[^\u4e00-\u9fa5]/g,'')
            } else if(type==="EN"){
                value=value.replace(/[^a-zA-Z]/g,'')
            }
            if(Array.isArray(index)){
                this.formData[index[0]].options[index[1]].value = value;
            } else {
                this.formData[index].value = value;
            }
        }
    },
}
</script>

<style scoped lang="scss">
.formBuilder {
    width: 900px;
    height: 100%;
    .contentBox {
        width: 100%;
        height: auto;
        padding: 40px 0;
        box-sizing: border-box;
    }
    .questionBox {
        width: 100%;
        padding: 18px 30px;
        background-color: #FFF;
        box-sizing: border-box;
        display: flex;
        margin: 12px 0;
        transition: all .2s linear;
        .order {
            width: 40px;
            height: 100%;
            float: left;
            flex-shrink: 0;
            line-height: 36px;
            color: #484848;
            font-size: 18px;
        }
        .wrapper {
            flex-grow: 1;
            color: #484848;
            text-align: left;
            dt {
                line-height: 36px;
                font-size: 16px;
                text-align: left;
                margin-bottom: 5px;
                .iconBox {
                    float: right;
                    box-sizing: border-box;
                    width: 200px;
                    height: 36px;
                    text-align: right;
                    .icon {
                        cursor: pointer;
                        display: inline;
                        margin-right: 10px;
                    }
                    .ifLogic {
                            padding: 5px;
                            border: 1px solid red;
                            color: red;
                    }
                }
            }
            dd {
                text-align: left;
                line-height: 36px;
                font-size: 14px;
                margin: 5px 0;
                box-sizing: border-box;
                padding: 5px;
                border: 1px solid #FFF;
                &.selected {
                    border: 1px dashed #000;
                }
                .del {
                    float: right;
                }
                &.column {
                    display: inline-block;
                    width: 100%;
                    transition: all .2s linear;
                }
                &.column_2 {
                    width: 50%;
                }
                &.column_3 {
                    width: 33.33%;
                }
                &.column_4 {
                    width: 25%;
                }
            }
            .selectBox {
                width: 60px;
                float: left;
            }
        }
        .editBox {
            margin-top: 24px;
            .btn {
                float: right;
                margin-left: 10px;
            }
        }
        &.selected {
            box-shadow: 0 10px 15px 0 rgba(0,0,0,.1);
            border: 2px solid #2672ff;
            border-radius: 4px;
            margin: 24px 0;
        }
        &.Fselect {
            .wrapper {
                dd {
                    .input {
                        width: 100px;
                    }
                }
            }
        }
    }
}
</style>
