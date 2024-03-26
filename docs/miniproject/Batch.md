# 批量删除微博

```js
var s = document.createElement('script');
s.setAttribute(
  'src',
  'https://lib.sinaapp.com/js/jquery/2.0.3/jquery-2.0.3.min.js'
);
s.onload = function() {
  setInterval(function() {
    if (!$('a[action-type="feed_list_delete"]')) {
      $('a.next').click();
    } else {
      $('a[action-type="feed_list_delete"]')[0].click();
      $('a[action-type="ok"]')[0].click();
    }

    // scroll bottom let auto load
    $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
    var len = $('div[action-type="feed_list_item"]').length;
    if (len < 5) { $('a[class="page next S_txt1 S_line1"]')[0].click(); }
  }, 800);
};
document.head.appendChild(s);
```
