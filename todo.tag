<todo>
<h1>{ opts.title }</h1>
<ul>
  <li each={ items }>{ title }</li>
</ul>

<script>
  this.items = [
    { title: "a" },
    { title: "b" },
    { title: "c" }
  ];
</script>
</todo>
