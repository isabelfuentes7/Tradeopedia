module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const dateNumeric = `${mo} ${da}, ${ye}`;

    return dateNumeric;
  },
  format_date_time: (date) => {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const time = new Intl.DateTimeFormat('en', { timeStyle: 'short' }).format(d);
    const dateNumeric = `${mo} ${da}, ${ye} ${time}`;

    return dateNumeric;
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },

  uniqueArray: (array, type) => {
    const filteredArr = array.reduce((acc, current) => {
      const x = acc.find((item) => item[type] === current[type]);

      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    return filteredArr;
  },
  uniqueArray2: (array, type1, type2) => {
    const filteredArr = array.reduce((acc, current) => {
      const x = acc.find((item) => item[type1] === current[type1] && item[type2] === current[type2]);

      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    return filteredArr;
  },
  gallery: (arr, nth, num) => {
    // example: const array = ['1','2','3','4','5','6','7','8','9',]
    // gallery(filteredImageArr, 3, 3) = [1,4,7] = Starts at position 0 and pulls every 3rd value
    // gallery(filteredImageArr, 3, 2) = [2,5,8] = Starts at position 1 and pulls every 3rd value
    // gallery(filteredImageArr, 3, 1) = [3,6,9] = Starts at position 2 and pulls every 3rd value
    return arr.filter((e, i) => i % nth === nth - [num]);
  },
  img_substring: (str) => {
    const image_time = str.substring(str.indexOf('-') + 1, str.lastIndexOf('.'));

    return image_time;
  },
  preview_message: (str) => {
    return str.split(' ').slice(0, 60).join(' ') + '...';
  },
};
