declare global {
  interface Map<K, V> {
    upsert(this: Map<K, V>, key: K, fn: (v?: V) => V): Map<K, V>;
    fromEntries<K, V>(this: Map<K, V>): [K, V][];
    fromValues<K, V>(this: Map<K, V>): V[];
    fromKeys<K, V>(this: Map<K, V>): K[];
  }
  interface WeakMap<K, V> {
    upsert(this: Map<K, V>, key: K, fn: (v?: V) => V): Map<K, V>;
  }
}

Object.defineProperties(Map.prototype, {
  upsert: {
    value: function <K, V>(this: Map<K, V>, key: K, fn: (v?: V) => V) {
      this.set(key, fn(this.get(key)));
      return this;
    },
  },
  fromEntries: {
    value: function <K, V>(this: Map<K, V>): [K, V][] {
      return Array.from(this.entries());
    },
  },
  fromValues: {
    value: function <K, V>(this: Map<K, V>): V[] {
      return Array.from(this.values());
    },
  },
  fromKeys: {
    value: function <K, V>(this: Map<K, V>): K[] {
      return Array.from(this.keys());
    },
  },
});

Object.defineProperties(WeakMap.prototype, {
  upsert: {
    value: function <K, V>(this: Map<K, V>, key: K, fn: (v?: V) => V) {
      this.set(key, fn(this.get(key)));
      return this;
    },
  },
  fromEntries: {
    value: function <K, V>(this: Map<K, V>): [K, V][] {
      return Array.from(this.entries());
    },
  },
  fromValues: {
    value: function <K, V>(this: Map<K, V>): V[] {
      return Array.from(this.values());
    },
  },
  fromKeys: {
    value: function <K, V>(this: Map<K, V>): K[] {
      return Array.from(this.keys());
    },
  },
});
