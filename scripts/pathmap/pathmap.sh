#!/bin/bash

# 경로 설정
appDir="src/app"
outputFile="src/app/(testing)/pathmap/pathmap.json"

# 수집할 경로가 존재하는지 확인
if [ ! -d "$appDir" ]; then
    echo "Error: App directory '$appDir' not found"
    exit 1
fi

# 기존 pathmap.json 파일 제거
if [ -f "$outputFile" ]; then
  rm "$outputFile"
fi

# pathmap.json 파일 초기화
echo "[]" > "$outputFile"

# 경로를 정리하는 함수
function cleanPath {
  local path=$1
  # 괄호, 대괄호, page.tsx 제거
  path=$(echo "$path" | sed -E 's/\(([^)]+)\)//g' | sed -E 's/\[([^\]]+)\]//g' | sed -E 's/page\.tsx$//g')
  # 중복된 슬래시 제거 및 마지막 슬래시 제거
  path=$(echo "$path" | sed -E 's/\/+/\//g' | sed -E 's/\/$//g')
  echo "$path"
}

# 재귀적으로 디렉토리를 탐색하여 pathmap을 생성하는 함수
function getPathMap {
  local dir=$1
  local basePath=$2

  for entry in "$dir"/*; do
    local entryName=$(basename "$entry")
    local fullPath="$dir/$entryName"
    local relativePath="$basePath/$entryName"

    if [ -d "$fullPath" ]; then
      getPathMap "$fullPath" "$relativePath"
    elif [ -f "$fullPath" ] && [ "$entryName" == "page.tsx" ]; then
      local cleanedPath=$(cleanPath "$relativePath")
      if [ -n "$cleanedPath" ]; then
        local pathmapFile="$dir/path.json"
        local pathmapData="{\"path\": \"$cleanedPath\"}"

        if [ -f "$pathmapFile" ]; then
          local fileSize=$(wc -c < "$pathmapFile")
          if [ $fileSize -gt 0 ]; then
            pathmapData=$(node -e "
              const fs = require('fs');
              const data = require('./$pathmapFile');
              data.path = '$cleanedPath';
              console.log(JSON.stringify(data));
            ")
          fi
        fi

        node -e "
          const fs = require('fs');
          const pathMap = JSON.parse(fs.readFileSync('$outputFile', 'utf-8'));
          pathMap.push($pathmapData);
          fs.writeFileSync('$outputFile', JSON.stringify(pathMap, null, 2));
        "
      fi
    fi
  done
}

# pathmap 생성 함수 호출
getPathMap "$appDir" ""

echo "Path map generated successfully at $outputFile."