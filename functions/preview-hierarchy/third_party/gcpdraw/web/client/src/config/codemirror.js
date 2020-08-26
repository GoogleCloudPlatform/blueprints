const gcpdrawFn = () => {
  return {
    // TODO: more robust implementation
    token: function(stream, state) {
      if (stream.match(/^"([^"]|\\.)*"?/)) {
        return "string";
      }
      if (stream.match(/^meta\s+/)) {
        return "keyword";
      }
      if (stream.match(/^title\s+/)) {
        return "keyword";
      }
      if (stream.match(/^elements\s+/)) {
        return "keyword";
      }
      if (stream.match(/^gcp\s+/)) {
        return "keyword";
      }
      if (stream.match(/^group\s+/)) {
        return "keyword";
      }
      if (stream.match(/^(card|stacked_card)\s+/)) {
        return "keyword";
      }
      if (stream.match(/^name\s+/)) {
        return "keyword";
      }
      if (stream.match(/^description\s+/)) {
        return "keyword";
      }
      if (stream.match(/^background_color\s+/)) {
        return "keyword";
      }
      if (stream.match(/^display_name\s+/)) {
        return "keyword";
      }
      if (stream.match(/^icon_url\s+/)) {
        return "keyword";
      }
      if (stream.match(/^paths\s+/)) {
        return "keyword";
      }
      if (stream.match(/^\s+\(?<?(-(down|up|right|left)?-|\.(down|up|right|left)?\.)>?\)?\s+/)) {
        return "atom";
      }
      if (stream.match(/\s+as\s+/)) {
        return "keyword";
      }
      if (stream.match(/^#.*$/)) {
        return "comment";
      }
      stream.next();
      return null
    }
  }
};

export const MODE_GCPDRAW = {name:'gcpdraw', fn: gcpdrawFn};
