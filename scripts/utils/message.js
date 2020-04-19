/**
 * \033[44;30m Set the background and foreground of the terminal as "Blue" and "Black"
 * \033[30m    Set the foreground color of the terminal to "Black" only.
 * \033[44m    Set the background color of the terminal to "Blue" only.
 * \033[0m     close Restore terminal color.
 * 
 *             Black  Red  Green  Yellow  Blue  Magenta  Cyan  White
 * Foreground:  30    31    32      33     34     35      36    37
 * Background:  40    41    42      43     44     45      46    47
 */

function Label(id, label, format, ...args) {
  console.log('\033[4' + id + ';30m ' + label + 
    ' \033[40;3' + id + 'm ' + format + '\033[0m', 
    ...args,
  );
} 

function message(id, label, format, ...args) {
  console.log('\033[3' + id + 'm' + label + ' \033[0m' + format, ...args);
}

function normalize(format) {
  if (format && (format instanceof Error)) {
    return format.stack.replace(/\s*error:?\s*/i, '');
  }

  return format;
}

module.exports = {
  error(format, tag, ...args) {
    return message(1, tag || 'error', normalize(format), ...args);
  },
  success(format, tag, ...args) {
    return message(2, tag || 'success', format, ...args);
  },
  warning(format, tag, ...args) {
    return message(3, tag || 'warning', format, ...args);
  },
  info(format, tag, ...args) {
    return message(4, tag || 'info', format, ...args);
  },
  label: {
    error(format, label, ...args) {
      return Label(1, label || 'ERROR', normalize(format), ...args);
    },
    success(format, label, ...args) {
      return Label(2, label || 'SUCCESS', format, ...args);
    },
    warning(format, label, ...args) {
      return Label(3, label || 'WARN', format, ...args);
    },
    info(format, label, ...args) {
      return Label(4, label || 'INFO', format, ...args);
    },
  },
};
