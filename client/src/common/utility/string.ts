interface String {
  capitalize() : string;
}

String.prototype.capitalize = function(): string { 
  if (this.length == 0) {
    return "";
  }

  return this.charAt(0).toUpperCase() + this.slice(1);
}