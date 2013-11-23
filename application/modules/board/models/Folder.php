<?php

class Board_Model_Folder extends Core_Model_Abstract {

    const TIME_FORMAT       = 'Y-m-d H:i:s';

    public function readDir($path) {
        try {
            $directoryIterator = new DirectoryIterator($path);
        } catch(Exception $e) {
            throw new Board_Model_Exception(Board_Model_Exception::INVALID_PATH);
        }

        $basePath = 'd:\\www\\l.gallery\\public\\files\\';

        $result = array();
        /**
         * @var $element DirectoryIterator
         */
        foreach($directoryIterator as $element) {
            if(!$element->isDot()) {

                $result[] = array(
                    'isDir'         => $element->isDir(),

                    'filename'      => $element->getFilename(),
                    'path'          => $element->getPath(),
                    'size'          => $element->getSize(),
                    'public'        => '/files/' . substr($element->getPath(), strlen($basePath)) . '/',

                    'creationTime'  => date(self::TIME_FORMAT, $element->getCTime()),
                    'modifyTime'    => date(self::TIME_FORMAT, $element->getMTime()),
                    'accessTime'    => date(self::TIME_FORMAT, $element->getATime()),
                );
            }
        }
        return $result;
    }

}