<?php
/**
 * Example PHP Unit Tests
 *
 * @package WPStarter
 */

use PHPUnit\Framework\TestCase;

/**
 * Example test case
 */
class ExampleTest extends TestCase
{
    /**
     * Test basic assertion
     */
    public function test_basic_assertion()
    {
        $this->assertTrue(true);
    }

    /**
     * Test string operations
     */
    public function test_string_operations()
    {
        $string = 'WPStarter';
        $this->assertEquals('WPStarter', $string);
        $this->assertStringContainsString('Starter', $string);
    }

    /**
     * Test array operations
     */
    public function test_array_operations()
    {
        $array = ['one', 'two', 'three'];
        $this->assertCount(3, $array);
        $this->assertContains('two', $array);
    }

    /**
     * Test math operations
     */
    public function test_math()
    {
        $this->assertEquals(4, 2 + 2);
        $this->assertGreaterThan(5, 10);
        $this->assertLessThan(15, 10);
    }
}
