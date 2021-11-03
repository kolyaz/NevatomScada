const objChek = (data, key) => {
  const arrDataKeys = Object.keys(data);
  if (arrDataKeys.indexOf(key) >= 0) {
    return true;
  }
  return false;
};
let index = 0;
let index2 = 0;
const ArrowBlink = (idClass1, idClass2, idClass3, idClass4) => {
  const arrClass1 = document.querySelectorAll(`.${idClass1}`);
  // arrClass1.forEach((item) => {
  //   item.classList.remove('StrelkaBlink');
  // });

  const arrClass2 = document.querySelectorAll(`.${idClass2}`);
  // arrClass2.forEach((item) => {
  //   item.classList.remove('StrelkaBlink');
  // });

  const arrClass3 = document.querySelectorAll(`.${idClass3}`);
  // arrClass3.forEach((item) => {
  //   item.classList.remove('StrelkaBlink');
  // });

  const arrClass4 = document.querySelectorAll(`.${idClass4}`);
  // arrClass4.forEach((item) => {
  //   item.classList.remove('StrelkaBlink');
  // });

  const count = arrClass1.length + arrClass2.length;
  const count2 = arrClass3.length + arrClass4.length;

  if (index < count - 1) {
    // eslint-disable-next-line
    index++;
    if (index <= arrClass1.length - 1) {
      arrClass1[index].classList.add('StrelkaBlink');
    } else if (index > arrClass1.length - 1) {
      arrClass2[index - arrClass1.length].classList.add('StrelkaBlink');
    }
  } else {
    index = 0;
  }

  if (index2 < count2 - 1) {
    // eslint-disable-next-line
    index2++;
    if (index2 <= arrClass3.length - 1) {
      arrClass3[index2].classList.add('StrelkaBlink');
    } else if (index2 > arrClass3.length - 1) {
      arrClass4[index2 - arrClass3.length].classList.add('StrelkaBlink');
    }
  } else {
    index2 = 0;
  }
};
const Arrows = (dataRun) => {
  const keyPrit = 'propsSupFan';
  const keyVyt = 'propsExFan';
  const arrowKom = document.querySelectorAll('.ArRoom');
  const arrowVyt = document.querySelectorAll('.ArEx');
  const arrowNar = document.querySelectorAll('.ArNar');
  const arrowPrit = document.querySelectorAll('.ArSup');
  if (dataRun) { // is FanVyt
    if (dataRun[`${keyVyt}`] && objChek(dataRun, keyVyt)) { // is Summer
      arrowKom.forEach((item) => {
        item.classList.remove('hidden');
      });

      arrowVyt.forEach((item) => {
        item.classList.remove('hidden');
      });
      if (+dataRun.seson) {
        arrowKom.forEach((item) => {
          item.classList.remove('strelkaKomWinter');
          item.classList.add('strelkaKomSummer');
        });

        arrowVyt.forEach((item) => {
          item.classList.remove('strelkaVytWinter');
          item.classList.add('strelkaVytSummer');
        });
      } else {
        arrowKom.forEach((item) => {
          item.classList.remove('strelkaKomSummer');
          item.classList.add('strelkaKomWinter');
        });

        arrowVyt.forEach((item) => {
          item.classList.remove('strelkaVytSummer');
          item.classList.add('strelkaVytWinter');
        });
      }
    } else {
      arrowKom.forEach((item) => {
        item.classList.add('hidden');
      });

      arrowVyt.forEach((item) => {
        item.classList.add('hidden');
      });
    }
    //= ==================================================FanPrit
    if (dataRun[`${keyPrit}`] && objChek(dataRun, keyPrit)) { // is FanPrit
      arrowPrit.forEach((item) => {
        item.classList.remove('hidden');
      });

      arrowNar.forEach((item) => {
        item.classList.remove('hidden');
      });
      if (+dataRun.seson) {
        arrowPrit.forEach((item) => {
          item.classList.remove('strelkaPritWinter');
          item.classList.add('strelkaPritSummer');
        });

        arrowNar.forEach((item) => {
          item.classList.remove('strelkaNarWinter');
          item.classList.add('strelkaNarSummer');
        });
      } else {
        arrowPrit.forEach((item) => {
          item.classList.remove('strelkaPritSummer');
          item.classList.add('strelkaPritWinter');
        });

        arrowNar.forEach((item) => {
          item.classList.remove('strelkaNarSummer');
          item.classList.add('strelkaNarWinter');
        });
      }
    } else {
      arrowPrit.forEach((item) => {
        item.classList.add('hidden');
      });

      arrowNar.forEach((item) => {
        item.classList.add('hidden');
      });
    }
  }
};

export { Arrows, ArrowBlink };
