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
    ...args
  );
} 

function message(id, label, format, ...args) {
  console.log('\033[3' + id + 'm' + label + ' \033[0m ' + format, ...args);
}

module.exports = {
  error: (format, ...args) => message(1, 'error', format, ...args),
  success: (format, ...args) => message(2, 'success', format, ...args),
  warning: (format, ...args) => message(3, 'warning', format, ...args),
  info: (format, ...args) => message(4, 'info', format, ...args),
  label: {
    error: (format, label, ...args) => Label(1, label || 'ERROR', format, ...args),
    success: (format, label, ...args) => Label(2, label || 'SUCCESS', format, ...args),
    warning: (format, label, ...args) => Label(3, label || 'WARN', format, ...args),
    info: (format, label, ...args) => Label(4, label || 'INFO', format, ...args),
  }
};
