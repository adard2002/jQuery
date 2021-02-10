'use strict';

// constructor function
function Horn (img, title, description, keyword, horns){
  this.img_url = img;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

Horn.prototype.render = function(){
  const $template = $('.photo-template').clone();
  const $h2 = $template.find('h2');
  $h2.text(this.title);
  console.log('within render function, h2:',this.title);
  const $image = $template.find('img');
  $image.attr('src', this.img_url);
  $image.attr('alt', this.keyword);
  $template.find('p').text(this.description);

  $template.removeClass('photo-template');
  $template.attr('class', this.name);

  $('main').append($template);
};

$.ajax('data/page-1.json').then(callStuffBack => {
  console.log(callStuffBack);
  const horns = [];
  callStuffBack.forEach( (horner) => {
    horns.push(new Horn(horner.image_url,horner.title,horner.description,horner.keyword,horner.horns));
    $('select').append(`<option value="${horner.keyword}">${horner.keyword}</option>`);
    console.log('json horners:',horner);
  });
  horns.forEach(horner => { horner.render();});

  $('select').change( function () {
    const choice = $('select').find(':selected').text();
    console.log(choice);
    $('section').hide();
    $(`#${choice}`).show();
  });
  horns.forEach(horner => { horner.render();});



});








// const chameleon = new Horn('https://secure.img1-ag.wfcdn.com/im/17007094/resize-h800%5Ecompr-r85/3589/35892451/Baby+Rhino+Figurine.jpg',
//   'Baby Rhino',
//   'This is actually a figurine but it looks kinda real',
//   'triceratops',
//   3);


// chameleon.render();
