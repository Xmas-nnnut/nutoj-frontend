<template>
  <div id="helpView">
    <MdViewer :value="notice || ''" />
    <a-divider size="0" />
  </div>
</template>

<script lang="ts" setup>
import MdViewer from "@/components/MdViewer.vue";

/* eslint-disable */
const notice =
  "# 常见问题帮助 \n\n" +
  "## 评测方式 \n\n" +
  "Java 使用 JDK 8 编译，镜像为 openjdk:8-alpine ，命令为: \n\n" +
  "``` javac -encoding utf-8 -J-Xmx256m Main.java ``` \n\n" +
  "C++ 使用 g++ 9.3.1 编译，命令为: \n\n" +
  "``` g++ -finput-charset=UTF-8 -fexec-charset=UTF-8 Main.cpp -o Main ``` \n\n" +
  "C 使用 gcc 9.3.1 编译，命令为: \n\n" +
  "``` gcc Main.c -o Main -finput-charset=UTF-8 -fexec-charset=UTF-8 ``` \n\n" +
  "这里给出的编译器版本仅供参考，请以实际编译器版本为准。\n\n" +
  "请使用 **标准输入输出** 。\n\n" +
  "## 程序样例\n\n" +
  "以下样例程序可用于解决这道简单的题目： **读入2个整数A和B，然后输出它们的和** 。\n\n" +
  "javac (.java) \n\n" +
  "```java \n" +
  "import java.util.Scanner;\n" +
  "public class Main {\n" +
  "    public static void main(String[] args) {\n" +
  "        Scanner in = new Scanner(System.in);\n" +
  "        while (in.hasNextInt()) {\n" +
  "            int a = in.nextInt();\n" +
  "            int b = in.nextInt();\n" +
  "            System.out.println(a + b);\n" +
  "        }\n" +
  "    }\n" +
  "}\n" +
  "``` \n\n" +
  "g++ (.cpp) \n\n" +
  "```cpp\n" +
  "#include <iostream>\n" +
  "using namespace std;\n" +
  "int main(){\n" +
  "    // io speed up\n" +
  "    const char endl = '\\n';\n" +
  "    std::ios::sync_with_stdio(false);\n" +
  "    cin.tie(nullptr);\n" +
  "\n" +
  "    int a, b;\n" +
  "    while (cin >> a >> b){\n" +
  "        cout << a+b << endl;\n" +
  "    }\n" +
  "    return 0;\n" +
  "}\n" +
  "``` \n\n" +
  "gcc (.c)\n\n" +
  " ```c\n " +
  "#include <stdio.h>\n" +
  "int main(){\n" +
  "    int a, b;\n" +
  "    while(scanf(\"%d %d\",&a, &b) != EOF){\n" +
  "        printf(\"%d\\n\", a + b);\n" +
  "    }\n" +
  "    return 0;\n" +
  "}\n" +
  "``` \n\n" +
  "## 结果说明 \n\n" +
  "判题状态: \n\n" +
  "- 0 - 待判题\n - 1 - 判题中\n - 2 - 成功\n - 3 - 失败 \n\n" +
  "判题信息: \n\n" +
  "- Accepted 成功\n" +
  "- Wrong Answer 答案错误\n" +
  "- Compile Error 编译错误\n" +
  "- Memory Limit Exceeded 内存溢出\n" +
  "- Time Limit Exceeded 超时\n" +
  "- Presentation Error 展示错误\n" +
  "- Output Limit Exceeded 输出溢出\n" +
  "- Waiting 等待中\n" +
  "- Dangerous Operation 危险操作\n" +
  "- Runtime Error 运行错误\n" +
  "- System Error 系统错误\n\n"
/* eslint-disable */
</script>

<style scoped>
#helpView {
  width: 800px;
  margin: auto;
}
</style>
