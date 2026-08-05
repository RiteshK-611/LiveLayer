param(
  [string]$Version = (node -p "require('./package.json').version")
)

$ErrorActionPreference = "Stop"
$root = $PWD.Path
$work = Join-Path $root "target\msix"
$package = Join-Path $work "package"
$assets = Join-Path $package "Assets"
$installer = Get-ChildItem "target\release\bundle\nsis\*.exe" | Select-Object -First 1
$sevenZip = "C:\Program Files\7-Zip\7z.exe"
$makeAppx = Get-ChildItem "C:\Program Files (x86)\Windows Kits\10\bin" -Recurse -Filter makeappx.exe |
  Where-Object { $_.FullName -match "\\x64\\" } |
  Select-Object -First 1 -ExpandProperty FullName

if (-not $installer -or -not (Test-Path $sevenZip) -or -not $makeAppx) {
  throw "NSIS installer, 7-Zip, or MakeAppx was not found."
}

Remove-Item $work -Recurse -Force -ErrorAction Ignore
New-Item $assets -ItemType Directory -Force | Out-Null
& $sevenZip x $installer.FullName "-o$work\extracted" -y | Out-Null
Copy-Item "$work\extracted\*" $package -Recurse -Force

Add-Type -AssemblyName System.Drawing
$source = [System.Drawing.Image]::FromFile((Join-Path $root "assets\livelayer.png"))
function Save-Icon([string]$Name, [int]$Size) {
  $bitmap = [System.Drawing.Bitmap]::new($Size, $Size)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.DrawImage($source, 0, 0, $Size, $Size)
  $graphics.Dispose()
  $bitmap.Save((Join-Path $assets $Name), [System.Drawing.Imaging.ImageFormat]::Png)
  $bitmap.Dispose()
}

Save-Icon "AppList.png" 44
Save-Icon "Square150x150Logo.png" 150
Save-Icon "StoreLogo.png" 50
foreach ($size in 16, 20, 24, 30, 32, 36, 40, 48, 60, 64, 72, 80, 96, 256) {
  Save-Icon "AppList.targetsize-$size.png" $size
  Save-Icon "AppList.targetsize-${size}_altform-unplated.png" $size
  Save-Icon "AppList.targetsize-${size}_altform-lightunplated.png" $size
}
$source.Dispose()

$manifest = (Get-Content "msix\AppxManifest.xml" -Raw).Replace("__VERSION__", "$Version.0")
$manifest | Set-Content (Join-Path $package "AppxManifest.xml") -NoNewline
$output = Join-Path $root "LiveLayer_${Version}_x64.msix"
Remove-Item $output -Force -ErrorAction Ignore
& $makeAppx pack /d $package /p $output /l
