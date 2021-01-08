<template>
  <a-upload-dragger
    name="file"
    :multiple="false"
    @change="handleChange"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    accept=".zip"
  >
    <p class="ant-upload-drag-icon">
      <a-icon type="inbox" />
    </p>
    <p class="ant-upload-text">
      Kliknij lub przeciągnij plik .zip
    </p>
  </a-upload-dragger>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["showAlert"]),
    handleChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        this.showAlert({ text: "Plik załadowany", type: "success"})
      } else if (status === 'error') {
        this.showAlert({ text: "Błąd przy załadowaniu pliku", type: "error"})
      }
    },
  },
};
</script>