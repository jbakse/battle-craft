Listen for Vue messages and do something (like clear or mark console).

```
window.addEventListener('message', function onWebpackMessage (e) {
  console.log("vue message");
});
```


Tricky concat with mutate?
```
arr1.push(...arr2);
```