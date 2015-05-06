import $ from 'jquery'

export function getJson(url, data)
{
  return new Promise((resolve, reject) => {
    console.log('GET ' + url);
    $.ajax({
      url: url,
      data: data,
      dataType: 'json'
    })
    .done(result => resolve(result))
    .fail((xhr, status, err) => {
      reject(err);
    });
  });
}

export function postJson(url, data)
{
  return new Promise((resolve,reject) => {
    console.log('POST ' + url);
    $.ajax({
      url: url,
      method: 'POST',
      // dataType: 'json',
      data: JSON.stringify(data),
      contentType: 'application/json'
    })
    .done(result => resolve(result))
    .fail((xhr, status, err) => {
      reject(xhr.status);
    });
  });
}
