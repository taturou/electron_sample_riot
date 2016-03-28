todo
  h1 { opts.title }

  ul
    li('each={items}') { num }

  script(type='text/coffeescript').
    @items = [
      { num: 1 }
      { num: 2 }
      { num: 3 }
      ]

