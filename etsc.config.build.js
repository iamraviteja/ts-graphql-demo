module.exports = {
  // Supports all esbuild.build options
  esbuild: {
    minify: false,
    platform: "node",
  },
  // Prebuild hook
  prebuild: async () => {
    console.log("prebuild");
    const rimrafSync = (await import("rimraf")).rimrafSync;
    rimrafSync("./dist"); // clean up dist folder
  },
  // Postbuild hook
  postbuild: async () => {
    console.log("postbuild");
    const cpy = (await import("cpy")).default;
    await cpy(
      [
        "src/**/*.json", // Copy all .json files
        "src/**/*.graphql", // Copy all .graphql files
        "!src/**/*.{tsx,ts,js,jsx}", // Ignore already built files
      ],
      "dist"
    );
  },
};
