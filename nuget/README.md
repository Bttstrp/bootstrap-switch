To build a NuGet package:

1. Update the version number in `Bootstrap.Switch.nuspec` 
2. On a Windows machine, run `build.cmd`
3. Push the generated package to http://nuget.org

The current package can be found at https://nuget.org/packages/Bootstrap.Switch/.

> **NOTE** - I'm currently using the date (YYYYMMDD) in the **Patch** portion of the version number because there doesn't seem to be any official version number on the project.