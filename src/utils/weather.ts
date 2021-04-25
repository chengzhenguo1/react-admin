/* 天气 */
(function (d) {
    window.WIDGET = {
        CONFIG: {
          layout: '1',
          width: '450',
          height: '150',
          background: '1',
          dataColor: 'FFFFFF',
          key: '4552b93460d347ff811417c67e167092',
        },
    }
    const c = d.createElement('link')
    c.rel = 'stylesheet'
    c.href = 'https://widget.heweather.net/standard/static/css/he-standard.css?v=1.4.0'
    const s = d.createElement('script')
    s.src = 'https://widget.heweather.net/standard/static/js/he-standard.js?v=1.4.0'
    const sn = d.getElementsByTagName('script')[0]
    sn.parentNode!.insertBefore(c, sn)
    sn.parentNode!.insertBefore(s, sn)
}(document))
