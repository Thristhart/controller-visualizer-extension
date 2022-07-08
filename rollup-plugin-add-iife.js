export default function addIIFE(iifeOptions) {
  return {
    name: "add-iife",
    generateBundle: (options, bundle, isWrite) => {
      Object.values(bundle).forEach((item) => {
        if (item.type === "chunk" && item.name.match(iifeOptions.target)) {
          item.code = `(function() {\n${item.code}\n})();`;
        }
      });
    },
  };
}
