<template>
    <table class="table">
        <caption class="caption-top">
            <input
                v-model="sidebar.item.description"
                placeholder="description"
                type="text"
                class="form-control mb11"
            />
            <ColorPanel v-model:color="sidebar.item.color"></ColorPanel>
        </caption>
        <tbody>
            <tr>
                <td>
                    <span class="custom-control custom-switch">
                        <input
                            id="requireSchema"
                            v-model="sidebar.item.requireSchema"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label for="requireSchema" class="custom-control-label">
                            requireSchema
                        </label>
                    </span>
                </td>
            </tr>
            <tr v-if="sidebar.item.requireSchema">
                <td>
                    <span class="custom-control custom-switch">
                        <input
                            id="requireLayer"
                            v-model="sidebar.item.requireLayer"
                            type="checkbox"
                            class="custom-control-input"
                        />
                        <label for="requireLayer" class="custom-control-label">
                            requireLayer
                        </label>
                    </span>
                </td>
            </tr>
            <tr v-else>
                <td>
                    <RunButton :script="sidebar.item"></RunButton>
                </td>
            </tr>
            <tr>
                <td>
                    <EditButton :file="file" :item="sidebar.item"></EditButton>
                </td>
            </tr>
            <tr>
                <td>
                    <textarea
                        v-model="sidebar.item.code"
                        class="form-control"
                        rows="11"
                        spellcheck="false"
                    ></textarea>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import Script from '@/model/Entity/Script'
import SideBar from '@/model/Entity/SideBar'
import File from '@/model/Service/File'
import { computed, defineComponent, PropType } from 'vue'
import EditButton from '../button/EditButton.vue'
import RunButton from '../button/RunButton.vue'
import ColorPanel from '../part/ColorPanel.vue'

export default defineComponent({
    components: {
        ColorPanel,
        EditButton,
        RunButton,
    },
    props: {
        sidebar: {
            type: Object as PropType<SideBar<Script>>,
            required: true,
        },
    },
    setup(props, context) {
        const file = computed(function () {
            return File.getScriptPath(props.sidebar.item!.un + '.js')
        })
        return { file }
    },
})
</script>
