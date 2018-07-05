#!/bin/bash
for filename in ./*.txt; do
 echo { \"code\": \"$filename\", \"content\": \"$(base64 $filename --w=0)\" } | json_pp > ${filename}.json 
done
