<script setup lang="ts">
import { getData } from '../utils/index'
import { ref } from 'vue'
const tableData = ref([])
const loading = ref(false)
const fetchData = () => {
  loading.value = true
  getData().then((res) => {
    tableData.value = fomatData(res)
    console.log('tableData', tableData)
    loading.value = false
  })
}

const fomatData = (datArr: any) => {
  return datArr.map((data: any[]) => {
    console.log(data)

    const obj = {
      id: '',
      code: 0,
      name: '',
      zt_time: '',
      lb_count: 0
    }
    const [code, name] = data[1].split(/\s+/)
    obj.id = data[0]
    obj.code = code
    obj.name = name
    obj.zt_time = data[4]
    obj.lb_count = data[6]
    return obj
  })
}
const rowClick = (row: any) => {
  console.log(row)
  if (String(row.code).startsWith('60')) {
    location.href = `xueqiu://S/SH${row.code}`
  } else if (String(row.code).startsWith('30')) {
    location.href = `xueqiu://S/SZ${row.code}`
  } else if (String(row.code).startsWith('00')) {
    location.href = `xueqiu://S/SZ${row.code}`
  }
}
</script>
<template>
  <main>
    <el-button @click="fetchData">刷新</el-button>

    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'zt_time', order: 'descending' }"
      @row-click="rowClick"
      v-loading="loading"
      stripe
      border
    >
      <el-table-column prop="code" label="代码" width="80" />
      <el-table-column prop="name" label="名称" width="100" />
      <el-table-column prop="zt_time" label="涨停" sortable width="100" />
      <el-table-column prop="lb_count" label="连扳" sortable />
    </el-table>
  </main>
</template>
