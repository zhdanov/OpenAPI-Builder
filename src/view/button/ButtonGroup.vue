<template>
    <div class="btn-group">
        <span
            @click="$emit('update:option', item)"
            v-for="item in list"
            :key="item"
            class="btn"
            :class="item === option ? 'btn-primary' : 'btn-outline-secondary'"
        >
            <span :class="textColor(item)">
                {{ item }}
            </span>
        </span>
    </div>
</template>

<script lang="ts">
import UniqueItemManagerInterface from '@/model/Entity/UniqueItemManagerInterface'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        option: {
            type: String,
            required: true,
        },
        list: {
            type: Object as PropType<string[]>,
            required: true,
        },
        manager: {
            type: Object as PropType<UniqueItemManagerInterface>,
            required: true,
        },
    },
    setup(props, context) {
        function textColor(item: string) {
            if (item === props.option) {
                return ''
            }
            if (props.manager.findByUN(item)) {
                return 'text-primary'
            }
            return ''
        }
        return { textColor }
    },
})
</script>
