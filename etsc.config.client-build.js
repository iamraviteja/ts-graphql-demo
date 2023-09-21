module.exports = {
  // Supports all esbuild.build options
  esbuild: {
    minify: false,
    bundle: true,
    entryPoints: ["./src/client/index.tsx"],
    outdir:"dist/public"
  },
  // Prebuild hook
  prebuild: async () => {
    console.log("prebuild client");
    const rimrafSync = (await import("rimraf")).rimrafSync;
    rimrafSync("./public"); // clean up public folder
  },
};
