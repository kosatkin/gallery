<?php

class Board_Model_Folder extends Core_Model_Abstract {

    const TIME_FORMAT       = 'Y-m-d H:i:s';

    public function readDir($path) {
        try {
            $directoryIterator = new DirectoryIterator($this->getRealPath($path));
        } catch(Exception $e) {
            throw new Board_Model_Exception(Board_Model_Exception::INVALID_PATH);
        }

        $result = array();
        /**
         * @var $element DirectoryIterator
         */
        foreach($directoryIterator as $element) {
            if(!$element->isDot()) {
                $result[] = array(
                    'isDir'         => $element->isDir(),

                    'filename'      => $element->getFilename(),
                    'path'          => $this->getPublicPath($element->getPathname()),
                    'size'          => $element->getSize(),

                    'creationTime'  => date(self::TIME_FORMAT, $element->getCTime()),
                    'modifyTime'    => date(self::TIME_FORMAT, $element->getMTime()),
                    'accessTime'    => date(self::TIME_FORMAT, $element->getATime()),
                );
            }
        }
        return $result;
    }

    protected function getRealPath($path) {
        return sprintf('%s%s%s', rtrim($this->config['path']['base'], '/\\'), DIRECTORY_SEPARATOR, trim($path, '/\\'));
    }

    protected function getPublicPath($path) {
        $basePath = $this->config['path']['base'];
        $subPath = str_replace('\\', '/', substr($path, strlen($basePath)));
        return sprintf('%s%s%s', rtrim($this->config['path']['public'], '/\\'), '/', trim($subPath, '/\\'));
    }

}